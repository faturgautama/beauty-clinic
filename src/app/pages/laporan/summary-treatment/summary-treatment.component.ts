import { formatCurrency, formatNumber } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { LaporanService } from 'src/app/services/laporan/laporan.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-summary-treatment',
    templateUrl: './summary-treatment.component.html',
    styleUrls: ['./summary-treatment.component.css']
})
export class SummaryTreatmentComponent implements OnInit, AfterViewInit {

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
            title: 'Filter Pencarian Omset Treament',
            filter: [
                {
                    text: 'Kode Treament',
                    value: 'st.kode_setup_tarif',
                    filter: 'like'
                },
                {
                    text: 'Nama Treament',
                    value: "st.nama_setup_tarif",
                    filter: 'like'
                }
            ]
        };

        this.GridHeaderAttributes = {
            column: [
                { field: 'kode_setup_tarif', headerName: 'KODE TREAMENT', },
                { field: 'nama_setup_tarif', headerName: 'NAMA TREAMENT', },
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
        this.laporanService.onGetSummaryOmsetTreatment(args)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }
}

