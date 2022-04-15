import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { IInsertSetupTarifModel, IUpdateSetupTarifModel } from 'src/app/model/setup-tarif.model';
import { SetupTarifService } from 'src/app/services/setup-tarif/setup-tarif.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-tarif',
    templateUrl: './setup-tarif.component.html',
    styleUrls: ['./setup-tarif.component.css']
})
export class SetupTarifComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormSetupTarif!: FormGroup;
    FormSetupTarifState!: 'insert' | 'update';

    modalRef?: BsModalRef;

    @ViewChild('ModalAddTarif') ModalAddTarif!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupTarifService: SetupTarifService
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
            { id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
            { id: 'update_status', caption: 'Update Status', icon: 'fas fa-check' },
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' }
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Tarif',
            filter: [
                {
                    text: 'Kode Tarif',
                    value: 'per.nama_depan',
                    filter: 'like'
                },
                {
                    text: 'Nama Tarif',
                    value: 'per.nama_depan',
                    filter: 'like'
                }
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_setup_tarif', headerName: 'ID SETUP TARIF', hide: true },
                { field: 'kode_setup_tarif', headerName: 'KODE TARIF', minWidth: 100 },
                { field: 'nama_setup_tarif', headerName: 'NAMA TARIF', minWidth: 200 },
                {
                    field: 'nominal_tarif', headerName: 'NOMINAL', minWidth: 100, headerClass: 'text-center', cellClass: 'text-end',
                    cellRenderer: (args: any) => {
                        return formatCurrency(args.value, 'EN', 'Rp. ');
                    },
                },
                {
                    field: 'is_paket', headerName: 'TARIF PAKET', headerClass: 'text-center', cellClass: 'text-center',
                    cellRenderer: (args: any) => {
                        if (args.value) {
                            return '<span><i class="fas fa-check fa-xs"></i></span>'
                        } else {
                            return '<span><i class="fas fa-times fa-xs"></i></span>'
                        }
                    },
                },
                {
                    field: 'is_active', headerName: 'STATUS ACTIVE', headerClass: 'text-center', cellClass: 'text-center',
                    cellRenderer: (args: any) => {
                        if (args.value) {
                            return '<span><i class="fas fa-check fa-xs"></i></span>'
                        } else {
                            return '<span><i class="fas fa-times fa-xs"></i></span>'
                        }
                    },
                }
            ],
            dataSource: []
        };

        this.FormSetupTarif = this.formBuilder.group({
            id_setup_tarif: [0, []],
            nama_setup_tarif: ["", [Validators.required]],
            nominal_tarif: [0, [Validators.required]],
            is_paket: [false, [Validators.required]],
        });

        this.handleSearchFilter([]);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.FormSetupTarifState = "insert";
                this.onOpenModalInsertUpdate();
                break;
            case 'edit':
                this.FormSetupTarifState = "update";
                this.onOpenModalInsertUpdate();
                this.id_setup_tarif.setValue(this.GridSelectedData.id_setup_tarif);
                this.nama_setup_tarif.setValue(this.GridSelectedData.nama_setup_tarif);
                this.nominal_tarif.setValue(this.GridSelectedData.nominal_tarif);
                this.is_paket.setValue(this.GridSelectedData.is_paket);
                break;
            case 'update_status':
                if (this.GridSelectedData) {
                    this.onUpdateStatus(this.GridSelectedData);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Warning', 'Tidak Ada Data yg Dipilih')
                }
                break;
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.setupTarifService.onGetAllByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalAddTarif, {
            backdrop: 'static'
        });

        this.onResetForm();
    }

    onSubmitForm(FormSetupTarif: IInsertSetupTarifModel): void {
        let parameter: IInsertSetupTarifModel = {
            nama_setup_tarif: FormSetupTarif.nama_setup_tarif,
            nominal_tarif: FormSetupTarif.nominal_tarif,
            is_paket: FormSetupTarif.is_paket
        };

        this.setupTarifService.onPostSave(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Tarif Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            });
    }

    onUpdateForm(FormSetupTarif: IUpdateSetupTarifModel): void {
        this.setupTarifService.onPutUpdate(FormSetupTarif)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Tarif Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                            this.FormSetupTarifState = 'insert';
                        });
                };
            })
    }

    onUpdateStatus(data: any): void {
        this.setupTarifService.onPutUpdateStatusActive(data.id_setup_tarif, data.is_active)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Tarif Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormSetupTarif.reset();
        this.id_setup_tarif.setValue(0);
        this.nama_setup_tarif.setValue("");
        this.nominal_tarif.setValue(0);
        this.is_paket.setValue(false);
    }

    get id_setup_tarif(): AbstractControl { return this.FormSetupTarif.get('id_setup_tarif') as AbstractControl };
    get nama_setup_tarif(): AbstractControl { return this.FormSetupTarif.get('nama_setup_tarif') as AbstractControl };
    get nominal_tarif(): AbstractControl { return this.FormSetupTarif.get('nominal_tarif') as AbstractControl };
    get is_paket(): AbstractControl { return this.FormSetupTarif.get('is_paket') as AbstractControl };
}
