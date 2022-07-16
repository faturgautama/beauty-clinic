import { formatNumber, formatCurrency } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { LaporanService } from 'src/app/services/laporan/laporan.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-detail-pendapatan',
    templateUrl: './detail-pendapatan.component.html',
    styleUrls: ['./detail-pendapatan.component.css']
})
export class DetailPendapatanComponent implements OnInit, AfterViewInit {

    API = API_CONFIG.API.BILLING;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridHeaderComp') GridHeaderComp!: GridComponent;
    GridHeaderAttributes!: GridAttribute;

    constructor(
        private utilityService: UtilityService,
        private laporanService: LaporanService
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Detail Pendapatan',
            filter: [
                {
                    text: 'Nama Pasien',
                    value: "concat(p.nama_depan, '' '', p.nama_belakang)",
                    filter: 'like'
                },
                {
                    text: 'No. Rekam Medis',
                    value: 'tp.no_rekam_medis',
                    filter: 'like'
                },
                {
                    text: 'No. Register',
                    value: 'tp.no_register',
                    filter: 'like'
                },
                {
                    text: 'Tgl. Invoice',
                    value: 'ti.tgl_invoice',
                    filter: 'between'
                },
                {
                    text: 'No. Invoice',
                    value: "ti.nomor_invoice",
                    filter: 'like'
                },
                {
                    text: 'Payment Method',
                    value: "spm.payment_method",
                    filter: 'like'
                },
                {
                    text: 'Bank Payment',
                    value: "sbp.nama_bank_payment",
                    filter: 'like'
                }
            ]
        };

        this.GridHeaderAttributes = {
            column: [
                { field: 'nama_pasien', headerName: 'NAMA PASIEN', },
                { field: 'no_rekam_medis', headerName: 'NO. REKAM MEDIS', },
                { field: 'no_register', headerName: 'NO. REGISTER', },
                {
                    field: 'tgl_invoice', headerName: 'TGL. INVOICE',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy HH:mm') }
                },
                { field: 'nomor_invoice', headerName: 'NO. INVOICE', },
                { field: 'payment_method', headerName: 'PAYMENT METHOD', },
                {
                    field: 'jumlah_bayar', headerName: 'JUMLAH BAYAR', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                { field: 'nama_bank_payment', headerName: 'BANK PAYMENT', },
            ],
            dataSource: []
        };
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.handleSearchFilter([{
                columnName: 'ti.tgl_invoice',
                filter: 'between',
                searchText: new Date().toISOString(),
                searchText2: new Date().toISOString()
            }]);
        }, 1);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.laporanService.onGetDetailPendapatan(args)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }
}
