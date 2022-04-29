import { formatCurrency, formatNumber } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { LaporanService } from 'src/app/services/laporan/laporan.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-summary-obat',
    templateUrl: './summary-obat.component.html',
    styleUrls: ['./summary-obat.component.css']
})
export class SummaryObatComponent implements OnInit, AfterViewInit {

    API = API_CONFIG.API.BILLING;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridHeaderComp') GridHeaderComp!: GridComponent;
    GridHeaderAttributes!: GridAttribute;

    constructor(
        private laporanService: LaporanService
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Omset Obat',
            filter: [
                {
                    text: 'Nama Obat',
                    value: "so.nama_obat",
                    filter: 'like'
                },
                {
                    text: 'Tgl. Invoice',
                    value: "ti.tgl_invoice",
                    filter: 'between'
                },
            ]
        };

        this.GridHeaderAttributes = {
            column: [
                { field: 'nama_obat', headerName: 'NAMA OBAT', },
                {
                    field: 'qty', headerName: 'QTY', cellClass: 'text-end', width: 150,
                    cellRenderer: (data: any) => { return formatNumber(data.value, 'EN') }
                },
                {
                    field: 'unit_amount', headerName: 'HARGA', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'total_amount', headerName: 'TOTAL', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'diskon_nominal', headerName: 'DISC', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'paid_amount', headerName: 'JUMLAH BAYAR', cellClass: 'text-end',
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
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.laporanService.onGetSummaryOmsetObat(args)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }
}
