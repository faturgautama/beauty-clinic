import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { IHistoryTutupKasirModel, IValidasiTutupKasirModel } from 'src/app/model/setting-kasir.model';
import { SettingKasirService } from 'src/app/services/setting-kasir/setting-kasir.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-validasi-tutup-kasir',
    templateUrl: './validasi-tutup-kasir.component.html',
    styleUrls: ['./validasi-tutup-kasir.component.css']
})
export class ValidasiTutupKasirComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('GridHeaderComp') GridHeaderComp!: GridComponent;
    GridHeaderAttributes!: GridAttribute;
    GridHeaderSelectedData!: IHistoryTutupKasirModel;

    @ViewChild('GridPenerimaanVersiKasirComp') GridPenerimaanVersiKasirComp!: GridComponent;
    GridPenerimaanVersiKasirAttributes!: GridAttribute;

    @ViewChild('GridPenerimaanVersiSystemComp') GridPenerimaanVersiSystemComp!: GridComponent;
    GridPenerimaanVersiSystemAttributes!: GridAttribute;

    FormValidasi!: FormGroup;

    modalRef?: BsModalRef;
    @ViewChild('ModalValidasi') ModalValidasi!: TemplateRef<any>;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private settingKasirService: SettingKasirService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'validasi', caption: 'Validasi', icon: 'fas fa-check' },
            { id: 'cancel', caption: 'Cancel', icon: 'fas fa-times' },
        ];

        this.GridHeaderAttributes = {
            column: [
                { field: 'id_saldo_kasir', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'nomor_saldo_kasir', headerName: 'NO. FAKTUR', minWidth: 200 },
                { field: 'user_name', headerName: 'USER KASIR', minWidth: 100 },
                {
                    field: 'waktu_buka_kasir', headerName: 'WAKTU BUKA KASIR',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy HH:mm:ss') }
                },
                {
                    field: 'waktu_tutup_kasir', headerName: 'WAKTU TUTUP KASIR',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy HH:mm:ss') }
                },
                {
                    field: 'jumlah_modal_awal', headerName: 'JUMLAH MODAL',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'is_match', headerName: 'MATCH ?', cellClass: 'text-center',
                    cellRenderer: (data: any) => {
                        if (data.value) {
                            return '<span><i class="fas fa-check fa-xs"></i></span>'
                        } else {
                            return '<span><i class="fas fa-times fa-xs"></i></span>'
                        }
                    }
                },
            ],
            dataSource: []
        };

        this.GridPenerimaanVersiKasirAttributes = {
            column: [
                { field: 'id_saldo_kasir', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'id_payment_method', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'payment_method', headerName: 'NO. FAKTUR', minWidth: 200 },
                {
                    field: 'jumlah_penerimaan', headerName: 'JUMLAH PENERIMAAN',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };

        this.GridPenerimaanVersiSystemAttributes = {
            column: [
                { field: 'id_saldo_kasir', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'id_payment_method', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'payment_method', headerName: 'NO. FAKTUR', minWidth: 200 },
                {
                    field: 'jumlah_bayar', headerName: 'JUMLAH PENERIMAAN',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };

        this.FormValidasi = this.formBuilder.group({
            id_saldo_kasir: [0, [Validators.required]],
            keterangan_validasi: ["", [Validators.required]]
        });

        this.handleSearchFilter();
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'validasi':
                this.onOpenModalValidasi();
                break;
            case 'cancel':
                this.onCancelTutupKasir(this.GridHeaderSelectedData.id_saldo_kasir);
                break;
            default:
                break;
        }
    }

    handleSearchFilter(): void {
        this.settingKasirService.onGetRiwayatTutupKasir()
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: IHistoryTutupKasirModel): void {
        this.GridHeaderSelectedData = args;

        this.onGetDetailPenerimaanVersiKasir(args.id_saldo_kasir);

        this.onGetDetailPenerimaanVersiSystem(args.id_saldo_kasir);
    }

    onGetDetailPenerimaanVersiKasir(id_saldo_kasir: number): void {
        this.settingKasirService.onGetPendapatanVersiKasir(id_saldo_kasir)
            .subscribe((result) => {
                this.GridPenerimaanVersiKasirAttributes.dataSource = result.data;
            });
    }

    onGetDetailPenerimaanVersiSystem(id_saldo_kasir: number): void {
        this.settingKasirService.onGetPendapatanVersiSystem(id_saldo_kasir)
            .subscribe((result) => {
                this.GridPenerimaanVersiSystemAttributes.dataSource = result.data;
            });
    }

    onOpenModalValidasi(): void {
        this.modalRef = this.bsModalService.show(this.ModalValidasi, {
            backdrop: 'static'
        });

        this.onResetForm();
    }

    onValidasiTutupKasir(data: IValidasiTutupKasirModel): void {

        data.id_saldo_kasir = this.GridHeaderSelectedData.id_saldo_kasir;

        this.settingKasirService.onPostValidasiTutupKasir(data)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Buka Kasir Berhasil Divalidasi')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter();
                            this.GridPenerimaanVersiKasirAttributes.dataSource = [];
                            this.GridPenerimaanVersiSystemAttributes.dataSource = [];
                        });
                };
            })
    }

    onCancelTutupKasir(id_saldo_kasir: number): void {
        this.settingKasirService.onPostCancelTutupKasir(id_saldo_kasir)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Buka Kasir Berhasil Dibatalkan')
                        .then(() => {
                            this.handleSearchFilter();
                        });
                };
            })
    }

    onResetForm(): void {
        this.FormValidasi.reset();
        this.id_saldo_kasir.setValue(0);
        this.keterangan_validasi.setValue("");
    }

    get id_saldo_kasir(): AbstractControl { return this.FormValidasi.get('id_saldo_kasir') as AbstractControl };
    get keterangan_validasi(): AbstractControl { return this.FormValidasi.get('keterangan_validasi') as AbstractControl };
}
