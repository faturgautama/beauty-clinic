import { formatCurrency } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterSingleComponent, FilterSingleModel } from 'src/app/components/navigation/filter-single/filter-single.component';
import { ISummaryFeeBcModel } from 'src/app/model/laporan.model';
import { LaporanService } from 'src/app/services/laporan/laporan.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-fee-bc',
    templateUrl: './fee-bc.component.html',
    styleUrls: ['./fee-bc.component.css']
})
export class FeeBcComponent implements OnInit, AfterViewInit {

    API = API_CONFIG.API.BILLING;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterSingleComp') FilterSingleComp!: FilterSingleComponent;
    SelectedFilterParameter: FilterSingleModel = {} as any;

    DataFeeBcDatasource: ISummaryFeeBcModel[] = [];
    SelectedDataFeeBc: ISummaryFeeBcModel = {} as any;

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
                { field: 'no_register', headerName: 'NO. REGISTER', },
                { field: 'no_rekam_medis', headerName: 'NO. REKAM MEDIS', },
                { field: 'nama_pasien', headerName: 'NAMA PASIEN', },
                {
                    field: 'tgl_transaksi', headerName: 'TGL. TRANSAKSI',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy HH:mm') }
                },
                { field: 'kode_setup_tarif', headerName: 'KODE TREATMENT', },
                { field: 'nama_setup_tarif', headerName: 'NAMA TREATMENT', },
                {
                    field: 'paid_amount', headerName: 'JUMLAH BAYAR', cellClass: 'text-end',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'fee_pelaksana', headerName: 'FEE BC', cellClass: 'text-end',
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
        this.SelectedFilterParameter = {
            tanggal_mulai: args.tanggal_mulai,
            tanggal_selesai: args.tanggal_selesai
        };

        this.laporanService.onGetSummaryFeeBc(args.tanggal_mulai, args.tanggal_selesai)
            .subscribe((result) => {
                this.DataFeeBcDatasource = result.data;
                this.GridHeaderAttributes.dataSource = [];
            });
    }

    handleClickListDataFeeDokter(data: ISummaryFeeBcModel): void {
        this.SelectedDataFeeBc = data;

        this.DataFeeBcDatasource.forEach((item) => {
            if (item.id_user == data.id_user) {
                const el = (<HTMLElement>document.getElementById(data.id_user + "_list_fee_dokter"));
                el.classList.add('active')
            } else {
                const el = (<HTMLElement>document.getElementById(item.id_user + "_list_fee_dokter"));

                if (el.classList.contains('active')) {
                    el.classList.remove('active');
                };
            }
        });

        this.onSearchDetailFeeBc(data);
    }

    onSearchDetailFeeBc(data: ISummaryFeeBcModel): void {
        this.laporanService.onGetDetailFeeBc(data.id_user, this.SelectedFilterParameter.tanggal_mulai, this.SelectedFilterParameter.tanggal_selesai)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            })
    }
}   
