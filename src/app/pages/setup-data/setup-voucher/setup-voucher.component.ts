import { formatCurrency, formatNumber } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { IInsertSetupVoucherModel, ISetupVoucherModel, IUpdateSetupVoucherModel } from 'src/app/model/setup-voucher.model';
import { SetupVoucherService } from 'src/app/services/setup-voucher/setup-voucher.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-voucher',
    templateUrl: './setup-voucher.component.html',
    styleUrls: ['./setup-voucher.component.css']
})
export class SetupVoucherComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormSetupVoucher!: FormGroup;
    FormSetupVoucherState!: 'insert' | 'update';

    modalRef?: BsModalRef;

    @ViewChild('ModalAddVoucher') ModalAddVoucher!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupVoucherService: SetupVoucherService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
            { id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
            { id: 'delete', caption: 'Delete', icon: 'fas fa-trash' },
            { id: 'update_status', caption: 'Update Status', icon: 'fas fa-check' },
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' }
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Voucher',
            filter: [
                {
                    text: 'Kode Voucher',
                    value: 'sv.kode_voucher',
                    filter: 'like'
                },
                {
                    text: 'Nama Voucher',
                    value: 'sv.nama',
                    filter: 'like'
                }
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_voucher', headerName: 'ID VOUCHER', hide: true },
                { field: 'kode_voucher', headerName: 'KODE VOUCHER', minWidth: 100 },
                { field: 'nama', headerName: 'NAMA VOUCHER', minWidth: 100 },
                { field: 'keterangan', headerName: 'KETERANGAN', minWidth: 200 },
                {
                    field: 'nominal_voucher', headerName: 'NOMINAL (Rp)', minWidth: 100, headerClass: 'text-center', cellClass: 'text-end',
                    cellRenderer: (args: any) => {
                        return formatCurrency(args.value, 'EN', 'Rp. ');
                    },
                },
                {
                    field: 'prosentase_voucher', headerName: 'PROSENTASE', minWidth: 100, headerClass: 'text-center', cellClass: 'text-end',
                    cellRenderer: (args: any) => {
                        return formatNumber(args.value, 'EN');
                    },
                },
                {
                    field: 'is_active', headerName: 'STATUS', headerClass: 'text-center', cellClass: 'text-center',
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

        this.FormSetupVoucher = this.formBuilder.group({
            id_voucher: [0, []],
            kode_voucher: ["", [Validators.required]],
            nama: ["", [Validators.required]],
            keterangan: ["", []],
            nominal_voucher: [0, [Validators.required]],
            prosentase_voucher: [0, [Validators.required]],
        });

        this.handleSearchFilter([]);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.FormSetupVoucherState = "insert";
                this.onOpenModalInsertUpdate();
                break;
            case 'edit':
                this.FormSetupVoucherState = "update";
                this.onOpenModalInsertUpdate();
                this.id_voucher.setValue(this.GridSelectedData.id_voucher);
                this.kode_voucher.setValue(this.GridSelectedData.kode_voucher);
                this.nama.setValue(this.GridSelectedData.nama);
                this.keterangan.setValue(this.GridSelectedData.keterangan);
                this.nominal_voucher.setValue(this.GridSelectedData.nominal_voucher);
                this.prosentase_voucher.setValue(this.GridSelectedData.prosentase_voucher);
                break;
            case 'delete':
                if (this.GridSelectedData) {
                    this.onDelete(this.GridSelectedData);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Warning', 'Tidak Ada Data yg Dipilih')
                }
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
        this.setupVoucherService.onGetAllByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalAddVoucher, {
            backdrop: 'static',
        });

        this.onResetForm();
    }

    onSubmitForm(FormSetupVoucher: IInsertSetupVoucherModel): void {
        let parameter: IInsertSetupVoucherModel = {
            kode_voucher: FormSetupVoucher.kode_voucher,
            nama: FormSetupVoucher.nama,
            keterangan: FormSetupVoucher.keterangan,
            nominal_voucher: FormSetupVoucher.nominal_voucher,
            prosentase_voucher: FormSetupVoucher.prosentase_voucher,
        };

        this.setupVoucherService.onPostSave(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Voucher Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            });
    }

    onUpdateForm(FormSetupVoucher: IUpdateSetupVoucherModel): void {
        this.setupVoucherService.onPutUpdate(FormSetupVoucher)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Voucher Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                            this.FormSetupVoucherState = 'insert';
                        });
                };
            })
    }

    onUpdateStatus(data: any): void {
        this.setupVoucherService.onPutUpdateStatusActive(data.id_voucher, data.is_active)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Voucher Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            })
    }

    onDelete(data: ISetupVoucherModel): void {
        this.setupVoucherService.onDelete(data.id_voucher)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Voucher Berhasil Dihapus')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormSetupVoucher.reset();
        this.id_voucher.setValue(0);
        this.kode_voucher.setValue("");
        this.nama.setValue("");
        this.keterangan.setValue("");
        this.nominal_voucher.setValue(0);
        this.prosentase_voucher.setValue("");
    }

    get id_voucher(): AbstractControl { return this.FormSetupVoucher.get('id_voucher') as AbstractControl };
    get kode_voucher(): AbstractControl { return this.FormSetupVoucher.get('kode_voucher') as AbstractControl };
    get nama(): AbstractControl { return this.FormSetupVoucher.get('nama') as AbstractControl };
    get keterangan(): AbstractControl { return this.FormSetupVoucher.get('keterangan') as AbstractControl };
    get nominal_voucher(): AbstractControl { return this.FormSetupVoucher.get('nominal_voucher') as AbstractControl };
    get prosentase_voucher(): AbstractControl { return this.FormSetupVoucher.get('prosentase_voucher') as AbstractControl };
}
