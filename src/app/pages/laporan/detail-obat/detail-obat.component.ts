import { formatNumber, formatCurrency } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { LaporanService } from 'src/app/services/laporan/laporan.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../../api';

@Component({
    selector: 'app-detail-obat',
    templateUrl: './detail-obat.component.html',
    styleUrls: ['./detail-obat.component.css']
})
export class DetailObatComponent implements OnInit, AfterViewInit {

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
            title: 'Filter Pencarian Omset Obat',
            filter: [
                {
                    text: 'No. Register',
                    value: 'tp.no_register',
                    filter: 'like'
                },
                {
                    text: 'No. Rekam Medis',
                    value: 'tp.no_rekam_medis',
                    filter: 'like'
                },
                {
                    text: 'Nama Obat',
                    value: "st.nama_obat",
                    filter: 'like'
                }
            ]
        };

        this.GridHeaderAttributes = {
            column: [
                { field: 'no_register', headerName: 'NO. REGISTER', },
                { field: 'no_rekam_medis', headerName: 'NO. REKAM MEDIS', },
                { field: 'nama_pasien', headerName: 'NAMA PASIEN', },
                {
                    field: 'tanggal_registrasi', headerName: 'TGL. PELAYANAN',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy HH:mm') }
                },
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
        this.laporanService.onGetDetailOmsetObat(args)
            .subscribe((result) => {
                this.GridHeaderAttributes.dataSource = result.data;
            });
    }
}
