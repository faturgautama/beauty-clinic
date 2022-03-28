import { formatCurrency, formatNumber } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { IInsertSetupObatModel, IUpdateSetupObatModel } from 'src/app/model/setup-obat.model';
import { SetupObatService } from 'src/app/services/setup-obat/setup-obat.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-obat',
    templateUrl: './setup-obat.component.html',
    styleUrls: ['./setup-obat.component.css']
})
export class SetupObatComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormSetupObat!: FormGroup;
    FormSetupObatState!: 'insert' | 'update';

    modalRef?: BsModalRef;

    @ViewChild('ModalAddObat') ModalAddObat!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupObatService: SetupObatService
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
            { id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' }
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Obat',
            filter: [
                {
                    text: 'Nama Obat',
                    value: 'so.nama_obat',
                    filter: 'like'
                },
                {
                    text: 'Deskripsi Obat',
                    value: 'so.deskripsi_obat',
                    filter: 'like'
                }
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_obat', headerName: 'ID OBAT', hide: true },
                { field: 'nama_obat', headerName: 'NAMA OBAT', minWidth: 100 },
                { field: 'deskripsi_obat', headerName: 'DESKRIPSI OBAT', minWidth: 200 },
                { field: 'keterangan_pemakaian', headerName: 'KETERANGAN PEMAKAIAN', minWidth: 200 },
                {
                    field: 'harga_jual', headerName: 'HARGA JUAL', minWidth: 100, headerClass: 'text-center', cellClass: 'text-end',
                    cellRenderer: (args: any) => {
                        return formatCurrency(args.value, 'EN', 'Rp. ');
                    },
                },
                {
                    field: 'prosentase_ppn', headerName: 'PROSENTASE PPN', minWidth: 100, headerClass: 'text-center', cellClass: 'text-end',
                    cellRenderer: (args: any) => {
                        return formatNumber(args.value, 'EN');
                    },
                },
            ],
            dataSource: []
        };

        this.FormSetupObat = this.formBuilder.group({
            id_obat: [0, []],
            nama_obat: ["", [Validators.required]],
            deskripsi_obat: ["", [Validators.required]],
            keterangan_pemakaian: ["", [Validators.required]],
            harga_jual: [0, [Validators.required]],
            prosentase_ppn: [0, [Validators.required]],
        });

        this.handleSearchFilter([]);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.FormSetupObatState = "insert";
                this.onOpenModalInsertUpdate();
                break;
            case 'edit':
                this.FormSetupObatState = "update";
                this.onOpenModalInsertUpdate();
                this.id_obat.setValue(this.GridSelectedData.id_obat);
                this.nama_obat.setValue(this.GridSelectedData.nama_obat);
                this.deskripsi_obat.setValue(this.GridSelectedData.deskripsi_obat);
                this.keterangan_pemakaian.setValue(this.GridSelectedData.keterangan_pemakaian);
                this.harga_jual.setValue(this.GridSelectedData.harga_jual);
                this.prosentase_ppn.setValue(this.GridSelectedData.prosentase_ppn);
                break;
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.setupObatService.onGetAllByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalAddObat, {
            backdrop: 'static'
        });

        this.onResetForm();
    }

    onSubmitForm(FormSetupObat: IInsertSetupObatModel): void {
        let parameter: IInsertSetupObatModel = {
            nama_obat: FormSetupObat.nama_obat,
            deskripsi_obat: FormSetupObat.deskripsi_obat,
            keterangan_pemakaian: FormSetupObat.keterangan_pemakaian,
            harga_jual: FormSetupObat.harga_jual,
            prosentase_ppn: FormSetupObat.prosentase_ppn
        };

        this.setupObatService.onPostSave(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Obat Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                        });
                };
            });
    }

    onUpdateForm(FormSetupObat: IUpdateSetupObatModel): void {
        this.setupObatService.onPutUpdate(FormSetupObat)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Obat Berhasil Diupdate')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter([]);
                            this.FormSetupObatState = 'insert';
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormSetupObat.reset();
        this.id_obat.setValue(0);
        this.nama_obat.setValue("");
        this.deskripsi_obat.setValue("");
        this.keterangan_pemakaian.setValue("");
        this.harga_jual.setValue(0);
        this.prosentase_ppn.setValue(0);
    }

    get id_obat(): AbstractControl { return this.FormSetupObat.get('id_obat') as AbstractControl };
    get nama_obat(): AbstractControl { return this.FormSetupObat.get('nama_obat') as AbstractControl };
    get deskripsi_obat(): AbstractControl { return this.FormSetupObat.get('deskripsi_obat') as AbstractControl };
    get keterangan_pemakaian(): AbstractControl { return this.FormSetupObat.get('keterangan_pemakaian') as AbstractControl };
    get harga_jual(): AbstractControl { return this.FormSetupObat.get('harga_jual') as AbstractControl };
    get prosentase_ppn(): AbstractControl { return this.FormSetupObat.get('prosentase_ppn') as AbstractControl };
}
