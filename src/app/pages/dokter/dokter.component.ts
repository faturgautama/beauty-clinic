import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { IGetAdmisiPasienModel } from 'src/app/model/pelayanan-pasien.model';
import { InfoPasienModel } from 'src/app/model/riwayat-pelayanan.model';
import { IPersonDokterModel } from 'src/app/model/setup-dokter.model';
import { ISetupObatModel } from 'src/app/model/setup-obat.model';
import { ISetupRoleModel } from 'src/app/model/setup-role.model';
import { ISetupTarifModel } from 'src/app/model/setup-tarif.model';
import { ISetupUserModel } from 'src/app/model/setup-user.model';
import { PelayananPasienService } from 'src/app/services/pelayanan-pasien/pelayanan-pasien.service';
import { PendaftaranPasienService } from 'src/app/services/pendaftaran-pasien/pendaftaran-pasien.service';
import { SetupDokterService } from 'src/app/services/setup-dokter/setup-dokter.service';
import { SetupObatService } from 'src/app/services/setup-obat/setup-obat.service';
import { SetupRoleService } from 'src/app/services/setup-role/setup-role.service';
import { SetupTarifService } from 'src/app/services/setup-tarif/setup-tarif.service';
import { SetupUserService } from 'src/app/services/setup-user/setup-user.service';
import { TreatmentService } from 'src/app/services/treatment/treatment.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../api';

@Component({
    selector: 'app-dokter',
    templateUrl: './dokter.component.html',
    styleUrls: ['./dokter.component.css']
})
export class DokterComponent implements OnInit {

    API = API_CONFIG.API;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;
    SelectedIdRegister: number = 0;

    PathFoto: string = "";

    modalRef?: BsModalRef;

    // ** Riwayat Pelayanan
    @ViewChild('ModalRiwayat') ModalRiwayat!: TemplateRef<any>;

    ListRiwayat: InfoPasienModel[] = [];
    SelectedListRiwayat: InfoPasienModel = {} as any;
    SelectedListRiwayatIndex: number = 0;

    @ViewChild('GridDetailRResepComp') GridDetailResepComp!: GridComponent;
    GridDetailResepAttributes!: GridAttribute;

    @ViewChild('GridDetailTreatmentComp') GridDetailTreatmentComp!: GridComponent;
    GridDetailTreatmentAttributes!: GridAttribute;

    // ** Input Treatment
    @ViewChild('ModalInsertUpdateTarif') ModalInsertUpdateTarif!: TemplateRef<any>;

    ListTreatment: any[] = [];
    SelectedListTreatment: any;
    SelectedListTreatmentIndex: number = 0;

    FormInsertUpdateTarif!: FormGroup;

    FormPelaksanaTindakan!: FormArray;

    DropdownTarifDatasource: ISetupTarifModel[] = [];
    DropdownTarifField: Object = { text: 'nama_setup_tarif', value: 'id_setup_tarif' };

    DropdownDokterDatasource: IPersonDokterModel[] = [];
    DropdownDokterField: Object = { text: 'full_name', value: 'id_dokter' };

    DropdownUserDatasource: ISetupUserModel[] = [];
    DropdownUserField: Object = { text: 'full_name', value: 'id_user' };

    DropdownRoleDatasource: ISetupRoleModel[] = [];
    DropdownRoleField: Object = { text: 'nama_role', value: 'id_role' };

    // ** Input Obat
    @ViewChild('ModalInsertUpdateResep') ModalInsertUpdateResep!: TemplateRef<any>;

    ListResep: any[] = [];
    SelectedListResep: any;
    SelectedListResepIndex: number = 0;

    FormInsertUpdateResep!: FormGroup;

    DropdownObatDatasource: ISetupObatModel[] = [];
    DropdownObatField: Object = { text: 'nama_obat', value: 'id_obat' };

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private treatmentService: TreatmentService,
        private setupRoleService: SetupRoleService,
        private setupUserService: SetupUserService,
        private setupObatService: SetupObatService,
        private setupTarifService: SetupTarifService,
        private setupDokterService: SetupDokterService,
        private pelayananPasienService: PelayananPasienService,
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

        this.ActionButton = [
            { tabId: 'riwayat_pasien', id: 'riwayat', caption: 'Riwayat', icon: 'fas fa-filter' },
            { tabId: 'treatment_pasien', id: 'add_treatment', caption: 'Add', icon: 'fas fa-plus' },
            { tabId: 'treatment_pasien', id: 'delete_treatment', caption: 'Delete', icon: 'fas fa-trash' },
            { tabId: 'resep_pasien', id: 'add_obat', caption: 'Add', icon: 'fas fa-plus' },
            { tabId: 'resep_pasien', id: 'delete_obat', caption: 'Delete', icon: 'fas fa-trash' },
        ];

        this.GridDetailTreatmentAttributes = {
            column: [
                { field: 'id_transaksi', headerName: 'ID TRANSAKSI', hide: true },
                { field: 'kode_setup_tarif', headerName: 'KODE TREATMENT', },
                { field: 'nama_setup_tarif', headerName: 'NAMA TREATMENT', },
                { field: 'dokter', headerName: 'NAMA DOKTER', },
            ],
            dataSource: []
        };

        this.GridDetailResepAttributes = {
            column: [
                { field: 'id_transaksi_obat', headerName: 'ID TRANSAKSI OBAT', hide: true },
                { field: 'nama_obat', headerName: 'NAMA OBAT', },
                { field: 'qty', headerName: 'QTY', },
            ],
            dataSource: []
        };

        this.FormInsertUpdateTarif = this.formBuilder.group({
            id_setup_tarif: [0, [Validators.required]],
            nama_setup_tarif: ["", []],
            nominal_tarif: [0, []],
            id_dokter: [0, [Validators.required]],
            nama_dokter: ['', []],
            qty: [1, []],
            subtotal: [0, []],
            pelaksana_tindakan: this.formBuilder.array([])
        });

        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('pelaksana_tindakan') as FormArray;
        this.FormPelaksanaTindakan.push(this.formBuilder.group({
            id_user: [0, [Validators.required]],
            id_role: [0, [Validators.required]],
        }));

        this.setupTarifService.onGetAllByDynamicFilter([])
            .pipe(
                map((result) => {
                    const is_active = result.data.filter((item) => {
                        return item.is_active == true;
                    });

                    return is_active;
                })
            )
            .subscribe((result) => {
                this.DropdownTarifDatasource = result;
            });

        this.setupDokterService.onGetAllPersonDokter()
            .subscribe((result) => {
                this.DropdownDokterDatasource = result.data;
            });

        this.setupUserService.onGetAllUserActive()
            .subscribe((result) => {
                this.DropdownUserDatasource = result.data;
            });

        this.setupRoleService.onGetAllRole()
            .subscribe((result) => {
                this.DropdownRoleDatasource = result.data;
            });

        this.FormInsertUpdateResep = this.formBuilder.group({
            id_register: [0, [Validators.required]],
            id_obat: [0, [Validators.required]],
            nama_obat: ["", [Validators.required]],
            keterangan_pemakaian: ["", []],
            kandungan_obat: ["", []],
            qty_obat: [0, [Validators.required]],
            unit_amount: [0, [Validators.required]],
            total_amount: [0, [Validators.required]],
        });

        this.setupObatService.onGetAllByDynamicFilter([])
            .subscribe((result) => {
                this.DropdownObatDatasource = result.data;
            });
    }

    handleChooseFilterDialogPasien(args: IGetAdmisiPasienModel): void {
        this.SelectedIdRegister = args.id_register;

        const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;
        nama_pasien.value = args.nama_pasien;

        const no_rekam_medis = document.getElementById('no_rekam_medis') as HTMLInputElement;
        no_rekam_medis.value = args.no_rekam_medis;

        const keluhan = document.getElementById('keluhan') as HTMLInputElement;
        keluhan.innerHTML = args.keluhan ? args.keluhan : "";

        this.onGetFotoPasien(args.id_person);

        this.onGetListRiwayat(args.no_rekam_medis);
    }

    onGetFotoPasien(id_person: number): void {
        this.pendaftaranPasienService.onGetLinkFotoPerson(id_person)
            .subscribe((result) => {
                this.PathFoto = result.data;
            })
    }

    onSetActionButton(tabId: string): ActionButtonModel[] {
        return this.ActionButton.filter((item) => {
            return item.tabId == tabId;
        });
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'riwayat':
                if (this.SelectedListRiwayat) {
                    this.handleOpenModalRiwayat(this.SelectedListRiwayat);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Oops', 'Tidak Ada Data yg Dipilih')
                }
                break;
            case 'add_treatment':
                this.handleOpenModalInsertUpdateTarif();
                break;
            case 'delete_treatment':
                this.onDeleteTarif(this.SelectedListTreatmentIndex);
                break;
            case 'add_obat':
                this.handleOpenModalInsertUpdateResep();
                break;
            case 'delete_obat':
                this.onDeleteResep(this.SelectedListResepIndex);
                break;
            default:
                break;
        }
    }

    onGetListRiwayat(no_rekam_medis: string): void {
        const parameter = [
            {
                "columnName": "p.no_rekam_medis",
                "filter": "like",
                "searchText": no_rekam_medis,
                "searchText2": ""
            }
        ];

        this.pelayananPasienService.onGetRiwayatAdmisiPasienByDynamicFilter(parameter)
            .subscribe((result) => {
                this.ListRiwayat = result.data[0].info_pasien;
            });
    }

    handleClickListRiwayat(item: any, index: number): void {
        this.SelectedListRiwayat = item;

        this.SelectedListRiwayatIndex = index;

        const elem = document.getElementById('cardListTreatment' + index) as HTMLElement;

        this.ListRiwayat.forEach((item, i) => {
            const el = document.getElementById('cardListTreatment' + i) as HTMLElement;

            console.log(el);

            if (i != index) {
                if (el.classList.contains('treatmentSelected')) {
                    el.classList.remove('treatmentSelected');
                }
            } else {
                elem.classList.add('treatmentSelected')
            }
        });
    }

    handleOpenModalRiwayat(data: InfoPasienModel): void {
        this.modalRef = this.bsModalService.show(this.ModalRiwayat, {
            backdrop: 'static',
            class: 'modal-lg'
        });

        this.GridDetailResepAttributes.dataSource = [];
        this.GridDetailTreatmentAttributes.dataSource = [];

        this.GridDetailResepAttributes.dataSource = data.resep;
        this.GridDetailTreatmentAttributes.dataSource = data.tindakan;
    }

    handleOpenModalInsertUpdateTarif(): void {
        this.modalRef = this.bsModalService.show(this.ModalInsertUpdateTarif, {
            backdrop: 'static',
            class: 'modal-lg'
        });

        this.onResetForm();
    }

    handleChangeDropdownTarif(args: any): void {
        const itemData = args.itemData;

        this.nama_setup_tarif.setValue(itemData.nama_setup_tarif);
        this.nominal_tarif.setValue(itemData.nominal_tarif);
        this.qty.setValue(0);
    }

    handleChangeDropdownDokter(args: any): void {
        const itemData = args.itemData;

        this.nama_dokter.setValue(itemData.full_name);
    }

    handleChangeDropdownUser(args: any, index: number): void {
        this.FormPelaksanaTindakan.controls[index].get('id_user')?.setValue(args.itemData.id_user);
        this.FormPelaksanaTindakan.controls[index].get('id_role')?.setValue(args.itemData.id_role);
    }

    handleAddPelaksanaTindakan(): void {
        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('pelaksana_tindakan') as FormArray;
        this.FormPelaksanaTindakan.push(
            this.formBuilder.group({
                id_user: [0, [Validators.required]],
                id_role: [0, [Validators.required]],
            })
        )
    }

    handleRemovePelaksanaTindakan(): void {
        this.FormPelaksanaTindakan = this.FormInsertUpdateTarif.get('pelaksana_tindakan') as FormArray;
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
        FormInsertUpdateTarif.pelaksana_tindakan = FormInsertUpdateTarif.pelaksana_tindakan.filter((item: any) => {
            return item.id_user !== 0 && item.id_role !== 0;
        });

        this.ListTreatment.push(FormInsertUpdateTarif);

        this.modalRef?.hide();
    }

    onDeleteTarif(index: any): void {
        this.ListTreatment.splice(index, 1);
    }

    onResetForm(): void {
        // this.FormInsertUpdateTarif.reset();
        this.id_setup_tarif.setValue(0);
        this.nama_setup_tarif.setValue('');
        this.nominal_tarif.setValue(0);
        this.id_dokter.setValue(0);
        this.nama_dokter.setValue('');
        this.qty.setValue(0);
        this.subtotal.setValue(0);
    }

    handleOpenModalInsertUpdateResep(): void {
        this.modalRef = this.bsModalService.show(this.ModalInsertUpdateResep, {
            backdrop: 'static'
        });

        this.onResetFormObat();
    }

    handleChangeDropdownResep(args: any): void {
        const itemData = args.itemData;

        this.nama_obat.setValue(itemData.nama_obat);
        this.keterangan_pemakaian.setValue(itemData.keterangan_pemakaian);
        this.kandungan_obat.setValue(itemData.kandungan_obat);
        this.unit_amount.setValue(itemData.harga_jual);
    }

    handleClickListResep(item: any, index: number): void {
        this.SelectedListResep = item;

        this.SelectedListResepIndex = index;

        const elem = document.getElementById('cardListResep' + index) as HTMLElement;

        this.ListResep.forEach((item, i) => {
            const el = document.getElementById('cardListResep' + i) as HTMLElement;

            if (i != index) {
                if (el.classList.contains('resepSelected')) {
                    el.classList.remove('resepSelected');
                }
            } else {
                elem.classList.add('resepSelected')
            }
        });
    }

    onSaveInsertUpdateResep(FormInsertUpdateResep: any): void {
        FormInsertUpdateResep.id_register = this.SelectedIdRegister;
        this.ListResep.push(FormInsertUpdateResep);

        this.modalRef?.hide();
    }

    onDeleteResep(index: any): void {
        this.ListResep.splice(index, 1);
    }

    onResetFormObat(): void {
        this.id_obat.setValue(0);
        this.nama_obat.setValue('');
        this.qty_obat.setValue(0);
        this.keterangan_pemakaian.setValue("");
        this.kandungan_obat.setValue("");
        this.unit_amount.setValue(0);
        this.total_amount.setValue(0);
    }

    get id_setup_tarif(): AbstractControl { return this.FormInsertUpdateTarif.get('id_setup_tarif') as AbstractControl };
    get nama_setup_tarif(): AbstractControl { return this.FormInsertUpdateTarif.get('nama_setup_tarif') as AbstractControl };
    get nominal_tarif(): AbstractControl { return this.FormInsertUpdateTarif.get('nominal_tarif') as AbstractControl };
    get id_dokter(): AbstractControl { return this.FormInsertUpdateTarif.get('id_dokter') as AbstractControl };
    get nama_dokter(): AbstractControl { return this.FormInsertUpdateTarif.get('nama_dokter') as AbstractControl };
    get qty(): AbstractControl { return this.FormInsertUpdateTarif.get('qty') as AbstractControl };
    get subtotal(): AbstractControl { return this.FormInsertUpdateTarif.get('subtotal') as AbstractControl };

    get pelaksana_tindakan(): FormArray {
        return this.FormInsertUpdateTarif.get('pelaksana_tindakan') as FormArray
    }

    get id_obat(): AbstractControl { return this.FormInsertUpdateResep.get('id_obat') as AbstractControl };
    get nama_obat(): AbstractControl { return this.FormInsertUpdateResep.get('nama_obat') as AbstractControl };
    get qty_obat(): AbstractControl { return this.FormInsertUpdateResep.get('qty_obat') as AbstractControl };
    get keterangan_pemakaian(): AbstractControl { return this.FormInsertUpdateResep.get('keterangan_pemakaian') as AbstractControl };
    get kandungan_obat(): AbstractControl { return this.FormInsertUpdateResep.get('kandungan_obat') as AbstractControl };
    get unit_amount(): AbstractControl { return this.FormInsertUpdateResep.get('unit_amount') as AbstractControl };
    get total_amount(): AbstractControl { return this.FormInsertUpdateResep.get('total_amount') as AbstractControl };
}
