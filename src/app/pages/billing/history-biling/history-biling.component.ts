import { formatCurrency, formatNumber } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { BillingService } from 'src/app/services/billing/billing.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';
import { IHistoryBillingHeaderModel } from '../../../model/billing.model';

@Component({
    selector: 'app-history-biling',
    templateUrl: './history-biling.component.html',
    styleUrls: ['./history-biling.component.css']
})
export class HistoryBilingComponent implements OnInit, AfterViewInit {

    API = API_CONFIG.API.BILLING;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridHeaderComp') GridHeaderComp!: GridComponent;
    GridHeaderAttributes!: GridAttribute;
    SelectedDataHeader!: IHistoryBillingHeaderModel;

    modalRef?: BsModalRef;
    @ViewChild('ModalRiwayat') ModalRiwayat!: TemplateRef<any>;

    @ViewChild('GridDetailResepComp') GridDetailResepComp!: GridComponent;
    GridDetailResepAttributes!: GridAttribute;

    @ViewChild('GridDetailTreatmentComp') GridDetailTreatmentComp!: GridComponent;
    GridDetailTreatmentAttributes!: GridAttribute;

    @ViewChild('GridDetailPaymentComp') GridDetailPaymentComp!: GridComponent;
    GridDetailPaymentAttributes!: GridAttribute;

    constructor(
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private billingService: BillingService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'detail', caption: 'Lihat Detail', icon: 'fas fa-history' },
            { id: 'payment', caption: 'Lihat Payment', icon: 'fas fa-file-invoice' },
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian History Billing',
            filter: [
                {
                    text: 'No. Register',
                    value: 'tp.no_register',
                    filter: 'like'
                },
                {
                    text: 'Nama Pasien',
                    value: "concat(p.nama_depan, ' ',p.nama_belakang)",
                    filter: 'like'
                },
                {
                    text: 'Nama Dokter',
                    value: "concat(pd.nama_depan, ' ',pd.nama_belakang)",
                    filter: 'like'
                },
            ]
        };

        this.GridHeaderAttributes = {
            column: [
                { field: 'id_register', headerName: 'ID REGISTER', hide: true },
                { field: 'no_register', headerName: 'NO. REGISTER', },
                {
                    field: 'time_inputed', headerName: 'TGL. INVOICE',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy') }
                },
                { field: 'no_rekam_medis', headerName: 'NO. REKAM MEDIS', },
                { field: 'nama_pasien', headerName: 'NAMA PASIEN', },
                { field: 'nama_dokter', headerName: 'NAMA DOKTER', },
                {
                    field: 'time_closed_bill', headerName: 'TGL. TUTUP KASIR',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy') }
                },
            ],
            dataSource: []
        };

        this.GridDetailTreatmentAttributes = {
            column: [
                { field: 'id_invoice', headerName: 'ID INVOICE', hide: true },
                { field: 'nama_setup_tarif', headerName: 'NAMA TREATMENT', width: 300, },
                {
                    field: 'qty', headerName: 'QTY', cellClass: 'text-end', width: 150,
                    cellRenderer: (data: any) => { return formatNumber(data.value, 'EN') }
                },
                {
                    field: 'unit_amount', headerName: 'HARGA', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'diskon_nominal', headerName: 'DISC', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'total_amount', headerName: 'TOTAL', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };

        this.GridDetailResepAttributes = {
            column: [
                { field: 'id_invoice', headerName: 'ID INVOICE', hide: true },
                { field: 'nama_obat', headerName: 'NAMA OBAT', width: 300 },
                {
                    field: 'qty', headerName: 'QTY', cellClass: 'text-end', width: 150,
                    cellRenderer: (data: any) => { return formatNumber(data.value, 'EN') }
                },
                {
                    field: 'unit_amount', headerName: 'HARGA', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'diskon_nominal', headerName: 'DISC', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'total_amount', headerName: 'TOTAL', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };

        this.GridDetailPaymentAttributes = {
            column: [
                { field: 'payment_method', headerName: 'PAYMENT METHOD' },
                {
                    field: 'jumlah_bayar', headerName: 'JUMLAH BAYAR', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.handleSearchFilter([]);
        }, 1);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'detail':
                if (this.SelectedDataHeader) {
                    this.onOpenModalRiwayat(this.SelectedDataHeader);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Oops', 'Tidak Ada Data yg Dipilih')
                }
                break;
            case 'payment':
                if (this.SelectedDataHeader) {
                    this.onOpenOffcanvasPayment();
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Oops', 'Tidak Ada Data yg Dipilih')
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
        this.billingService.onGetHistoryBilling(args)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: IHistoryBillingHeaderModel): void {
        this.SelectedDataHeader = args;

        this.GridDetailResepAttributes.dataSource = [];
        this.GridDetailTreatmentAttributes.dataSource = [];

        this.billingService.onGetDetailHistoryBilling(args.id_register)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.GridDetailResepAttributes.dataSource = result.data.history_obat;
                    this.GridDetailTreatmentAttributes.dataSource = result.data.history_treatment;
                    this.GridDetailPaymentAttributes.dataSource = result.data.history_payment;
                };
            });
    }

    onOpenModalRiwayat(data: IHistoryBillingHeaderModel): void {
        this.modalRef = this.bsModalService.show(this.ModalRiwayat, {
            backdrop: 'static',
            class: 'modal-lg'
        });
    }

    onOpenOffcanvasPayment(): void {
        (<HTMLElement>document.getElementById('btnOpenOffcanvas')).click();
    }

    handleCetakNota(id_register: number): void {
        this.billingService.onPrintNotaInvoice(id_register);
    }
}
