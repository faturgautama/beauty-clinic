import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { IGetAdmisiPasienModel } from 'src/app/model/pelayanan-pasien.model';
import { ISetupObatModel } from 'src/app/model/setup-obat.model';
import { PendaftaranPasienService } from 'src/app/services/pendaftaran-pasien/pendaftaran-pasien.service';
import { ResepService } from 'src/app/services/resep/resep.service';
import { SetupObatService } from 'src/app/services/setup-obat/setup-obat.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-input-resep',
    templateUrl: './input-resep.component.html',
    styleUrls: ['./input-resep.component.css']
})
export class InputResepComponent implements OnInit {

    API = API_CONFIG.API;

    ActionButton: ActionButtonModel[] = [
        {
            id: 'add', icon: 'fas fa-plus', caption: 'Add Obat'
        },
        {
            id: 'delete', icon: 'fas fa-trash', caption: 'Delete Obat'
        },
        {
            id: 'save', icon: 'fas fa-save', caption: 'Save Resep'
        },
    ];

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;
    SelectedIdRegister: number = 0;

    ListResep: any[] = [];
    SelectedListResep: any;
    SelectedListResepIndex: number = 0;

    modalRef?: BsModalRef;
    @ViewChild('ModalInsertUpdateResep') ModalInsertUpdateResep!: TemplateRef<any>;

    FormInsertUpdateResep!: FormGroup;

    PathFoto: string = "";

    DropdownObatDatasource: ISetupObatModel[] = [];
    DropdownObatField: Object = { text: 'nama_obat', value: 'id_obat' };

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private inputResepService: ResepService,
        private setupObatService: SetupObatService,
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

        this.FormInsertUpdateResep = this.formBuilder.group({
            id_register: [0, [Validators.required]],
            id_obat: [0, [Validators.required]],
            nama_obat: ["", [Validators.required]],
            keterangan_pemakaian: ["", []],
            kandungan_obat: ["", []],
            qty: [0, [Validators.required]],
            unit_amount: [0, [Validators.required]],
            total_amount: [0, [Validators.required]],
        });

        this.setupObatService.onGetAllByDynamicFilter([])
            .subscribe((result) => {
                this.DropdownObatDatasource = result.data;
            });

    }

    handleClickActionButton(button: ActionButtonModel): void {
        switch (button.id) {
            case 'add':
                this.handleOpenModalInsertUpdateResep();
                break;
            case 'delete':
                this.onDeleteResep(this.SelectedListResepIndex);
                break;
            case 'save':
                this.onSubmitResep(this.ListResep);
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
    }

    onGetFotoPasien(id_person: number): void {
        this.pendaftaranPasienService.onGetLinkFotoPerson(id_person)
            .subscribe((result) => {
                this.PathFoto = result.data;
            })
    }

    handleOpenModalInsertUpdateResep(): void {
        this.modalRef = this.bsModalService.show(this.ModalInsertUpdateResep, {
            backdrop: 'static'
        });

        this.onResetForm();
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

    onResetForm(): void {
        this.id_obat.setValue(0);
        this.nama_obat.setValue('');
        this.qty.setValue(0);
        this.keterangan_pemakaian.setValue("");
        this.kandungan_obat.setValue("");
        this.unit_amount.setValue(0);
        this.total_amount.setValue(0);
    }

    onSubmitResep(resep: any): void {
        this.inputResepService.onPostSave(resep)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Resep Berhasil Disimpan')
                        .then(() => {
                            this.inputResepService.onPrintResep(this.SelectedIdRegister);

                            this.SelectedIdRegister = 0;
                            this.ListResep = [];
                            this.SelectedListResep = 0;
                            this.SelectedListResepIndex = 0;

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

    get id_obat(): AbstractControl { return this.FormInsertUpdateResep.get('id_obat') as AbstractControl };
    get nama_obat(): AbstractControl { return this.FormInsertUpdateResep.get('nama_obat') as AbstractControl };
    get qty(): AbstractControl { return this.FormInsertUpdateResep.get('qty') as AbstractControl };
    get keterangan_pemakaian(): AbstractControl { return this.FormInsertUpdateResep.get('keterangan_pemakaian') as AbstractControl };
    get kandungan_obat(): AbstractControl { return this.FormInsertUpdateResep.get('kandungan_obat') as AbstractControl };
    get unit_amount(): AbstractControl { return this.FormInsertUpdateResep.get('unit_amount') as AbstractControl };
    get total_amount(): AbstractControl { return this.FormInsertUpdateResep.get('total_amount') as AbstractControl };
}
