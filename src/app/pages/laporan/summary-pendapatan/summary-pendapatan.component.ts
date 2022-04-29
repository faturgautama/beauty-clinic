import { formatCurrency, formatNumber } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterSingleComponent, FilterSingleModel } from 'src/app/components/navigation/filter-single/filter-single.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { LaporanService } from 'src/app/services/laporan/laporan.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-summary-pendapatan',
    templateUrl: './summary-pendapatan.component.html',
    styleUrls: ['./summary-pendapatan.component.css']
})
export class SummaryPendapatanComponent implements OnInit, AfterViewInit {

    API = API_CONFIG.API.BILLING;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterSingleComp') FilterSingleComp!: FilterSingleComponent;

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

        this.GridHeaderAttributes = {
            column: [
                { field: 'payment_method', headerName: 'PAYMENT METHOD', },
                { field: 'nama_bank_payment', headerName: 'BANK PAYMENT', },
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
            this.handleSearchFilter({ tanggal_mulai: new Date(), tanggal_selesai: new Date() });
        }, 1);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'filter':
                this.FilterSingleComp.handleOpenFilter();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterSingleModel): void {
        this.laporanService.onGetSummaryPendapatan(args.tanggal_mulai, args.tanggal_selesai)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }
}
