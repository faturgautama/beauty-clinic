import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { IGetAdmisiPasienModel } from 'src/app/model/pelayanan-pasien.model';
import { ISetupRoleModel } from 'src/app/model/setup-role.model';
import { ISetupUserModel } from 'src/app/model/setup-user.model';
import { DetailTreatmentModel } from 'src/app/model/treatment.model';
import { PendaftaranPasienService } from 'src/app/services/pendaftaran-pasien/pendaftaran-pasien.service';
import { SetupUserService } from 'src/app/services/setup-user/setup-user.service';
import { TreatmentService } from 'src/app/services/treatment/treatment.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-history-treatment',
    templateUrl: './history-treatment.component.html',
    styleUrls: ['./history-treatment.component.css']
})
export class HistoryTreatmentComponent implements OnInit {

    API = API_CONFIG.API;

    ActionButton: ActionButtonModel[] = [
        {
            id: 'edit', icon: 'fas fa-edit', caption: 'Edit Pelaksana Treatment'
        },
        {
            id: 'save', icon: 'fas fa-save', caption: 'Save Treatment'
        },
    ];

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;
    SelectedIdRegister: number = 0;

    ListTreatment: DetailTreatmentModel[] = [];
    SelectedListTreatment: DetailTreatmentModel = {} as any;
    SelectedListTreatmentIndex: number = 0;

    modalRef?: BsModalRef;
    @ViewChild('ModalInsertUpdateTarif') ModalInsertUpdateTarif!: TemplateRef<any>;

    FormInsertUpdateTarif!: FormGroup;

    PathFoto: string = "";

    FormPelaksanaTindakan!: FormArray;

    DropdownUserDatasource: ISetupUserModel[] = [];
    DropdownUserField: Object = { text: 'full_name', value: 'id_user' };

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private treatmentService: TreatmentService,
        private setupUserService: SetupUserService,
        private pendaftaranPasienService: PendaftaranPasienService,
    ) { }

    ngOnInit(): void {
        this.FilterDialogProp = {
            title: 'Pencarian Pasien',
            dynamicFilter: {
                columnName: `concat(per.nama_depan, ' ',per.nama_belakang)`,
                filter: 'like',
                searchText: '',
                searchText2: ''
            },
            searchUrl: this.API.PELAYANAN_PASIEN.GET_ALL_ADMISI_BY_DYNAMIC_FILTER,
            searchResultAttribute: {
                id: 'nama_pasien',
                text: 'no_rekam_medis'
            }
        };

        this.FormInsertUpdateTarif = this.formBuilder.group({
            id_transaksi: [0, []],
            id_register: [0, []],
            kode_setup_tarif: ["", []],
            nama_setup_tarif: ["", []],
            qty: [0, []],
            total: [0, []],
            dokter: ['', []],
            waktu_formated: ['', []],
            status: ['', []],
            bc_transaksi: this.formBuilder.array([])
        });

        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('bc_transaksi') as FormArray;
        this.FormPelaksanaTindakan.push(this.formBuilder.group({
            id_transaksi: [0, [Validators.required]],
            id_trans_detail_tindakan_medis_pelaksana: [0, [Validators.required]],
            id_user: [0, [Validators.required]],
            id_role: [0, [Validators.required]],
        }));

        this.setupUserService.onGetAllUserActive()
            .subscribe((result) => {
                this.DropdownUserDatasource = result.data;
            });
    }

    handleClickActionButton(button: ActionButtonModel): void {
        switch (button.id) {
            case 'edit':
                if (this.SelectedListTreatment) {
                    this.handleOpenModalInsertUpdateTarif(this.SelectedListTreatment);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Oops', 'Tidak Ada Data yg Dipilih')
                }
                break;
            case 'save':
                this.onSubmitTreatment(this.ListTreatment);
                break;
            default:
                break;
        }
    }

    handleChooseFilterDialogPasien(args: IGetAdmisiPasienModel): void {
        this.SelectedIdRegister = args.id_register;

        const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;
        nama_pasien.value = args.nama_pasien;

        const no_rekam_medis = document.getElementById('no_rekam_medis') as HTMLInputElement;
        no_rekam_medis.value = args.no_rekam_medis;

        const umur = document.getElementById('umur') as HTMLInputElement;
        umur.value = args.umur;

        this.onGetFotoPasien(args.id_person);

        this.onGetListTreatment(args.id_register);
    }

    onGetFotoPasien(id_person: number): void {
        this.pendaftaranPasienService.onGetLinkFotoPerson(id_person)
            .subscribe((result) => {
                this.PathFoto = result.data;
            })
    }

    onGetListTreatment(id_register: number): void {
        this.treatmentService.onGetHistory(id_register)
            .subscribe((result) => {

                result.data.filter((item) => {
                    item.bc_transaksi.filter((bc) => {
                        bc.id_transaksi = item.id_transaksi;
                    });
                });

                this.ListTreatment = result.data;

                console.log(this.ListTreatment);
            });
    }

    handleOpenModalInsertUpdateTarif(data: DetailTreatmentModel): void {
        this.modalRef = this.bsModalService.show(this.ModalInsertUpdateTarif, {
            backdrop: 'static',
            class: 'modal-lg'
        });

        this.onResetForm();

        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('bc_transaksi') as FormArray;

        if (data.bc_transaksi.length) {
            data.bc_transaksi.filter((item) => {
                delete item.fee_pelaksana;
            });

            this.FormInsertUpdateTarif.patchValue({
                bc_transaksi: data.bc_transaksi
            });
        } else {
            (this.FormInsertUpdateTarif.get('bc_transaksi') as FormArray).clear();
        }

        this.FormInsertUpdateTarif.setValue(data);
    }

    handleChangeDropdownUser(args: any, index: number): void {
        this.FormPelaksanaTindakan.controls[index].get('id_role')?.setValue(args.itemData.id_role);
    }

    handleAddPelaksanaTindakan(): void {
        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('bc_transaksi') as FormArray;
        this.FormPelaksanaTindakan.push(
            this.formBuilder.group({
                id_transaksi: [this.SelectedListTreatment.id_transaksi, [Validators.required]],
                id_trans_detail_tindakan_medis_pelaksana: [0, [Validators.required]],
                id_user: [0, [Validators.required]],
                id_role: [0, [Validators.required]],
            })
        )
    }

    handleRemovePelaksanaTindakan(): void {
        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('bc_transaksi') as FormArray;
        if (this.FormPelaksanaTindakan.length > 1) {
            this.FormPelaksanaTindakan.removeAt(this.FormPelaksanaTindakan.length - 1);
        }
    }

    handleClickListTreatment(item: any, index: number): void {
        this.SelectedListTreatment = item;

        this.SelectedListTreatmentIndex = index;

        const elem = document.getElementById('cardListTreatment' + index) as HTMLElement;

        this.ListTreatment.forEach((item, i) => {
            const el = document.getElementById('cardListTreatment' + i) as HTMLElement;

            if (i != index) {
                if (el.classList.contains('treatmentSelected')) {
                    el.classList.remove('treatmentSelected');
                }
            } else {
                elem.classList.add('treatmentSelected')
            }
        });
    }

    onSaveInsertUpdateTarif(FormInsertUpdateTarif: any): void {
        this.ListTreatment[this.SelectedListTreatmentIndex] = FormInsertUpdateTarif;

        this.modalRef?.hide();

        this.SelectedListTreatment = null as any;
        this.SelectedListTreatmentIndex = 0;
    }

    onResetForm(): void {
        // this.FormInsertUpdateTarif.reset();
        this.id_register.setValue(0);
        this.id_transaksi.setValue(0);
        this.kode_setup_tarif.setValue('');
        this.nama_setup_tarif.setValue('');
        this.qty.setValue(0);
        this.total.setValue(0);
        this.dokter.setValue('');
        this.waktu_formated.setValue('');
        this.status.setValue('');
    }

    onSubmitTreatment(list_treatment: DetailTreatmentModel[]): void {
        let bc_transaksi: any = [];

        list_treatment.filter((item) => {
            bc_transaksi.push(...item.bc_transaksi);
        });

        this.treatmentService.onPostUpdateBC(bc_transaksi)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'BC Treatment Berhasil Diupdate')
                        .then(() => {
                            this.SelectedIdRegister = 0;
                            this.ListTreatment = [];
                            this.SelectedListTreatment = null as any;
                            this.SelectedListTreatmentIndex = 0;

                            const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;
                            nama_pasien.value = "";

                            const no_rekam_medis = document.getElementById('no_rekam_medis') as HTMLInputElement;
                            no_rekam_medis.value = "";

                            const umur = document.getElementById('umur') as HTMLInputElement;
                            umur.value = "";

                            this.PathFoto = "";
                        });
                };
            });
    }

    get id_register(): AbstractControl { return this.FormInsertUpdateTarif.get('id_register') as AbstractControl };
    get id_transaksi(): AbstractControl { return this.FormInsertUpdateTarif.get('id_transaksi') as AbstractControl };
    get kode_setup_tarif(): AbstractControl { return this.FormInsertUpdateTarif.get('kode_setup_tarif') as AbstractControl };
    get nama_setup_tarif(): AbstractControl { return this.FormInsertUpdateTarif.get('nama_setup_tarif') as AbstractControl };
    get qty(): AbstractControl { return this.FormInsertUpdateTarif.get('qty') as AbstractControl };
    get total(): AbstractControl { return this.FormInsertUpdateTarif.get('total') as AbstractControl };
    get dokter(): AbstractControl { return this.FormInsertUpdateTarif.get('dokter') as AbstractControl };
    get waktu_formated(): AbstractControl { return this.FormInsertUpdateTarif.get('waktu_formated') as AbstractControl };
    get status(): AbstractControl { return this.FormInsertUpdateTarif.get('status') as AbstractControl };

    get bc_transaksi(): FormArray {
        return this.FormInsertUpdateTarif.get('bc_transaksi') as FormArray
    }
}
