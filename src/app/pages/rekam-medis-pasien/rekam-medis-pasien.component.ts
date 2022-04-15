import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { IGetPersonForLookupAdmisiModel } from 'src/app/model/pelayanan-pasien.model';
import { InfoPasienModel, IRiwayatPelayananPasienModel } from 'src/app/model/riwayat-pelayanan.model';
import { BillingService } from 'src/app/services/billing/billing.service';
import { PelayananPasienService } from 'src/app/services/pelayanan-pasien/pelayanan-pasien.service';
import { PendaftaranPasienService } from 'src/app/services/pendaftaran-pasien/pendaftaran-pasien.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../api';

@Component({
    selector: 'app-rekam-medis-pasien',
    templateUrl: './rekam-medis-pasien.component.html',
    styleUrls: ['./rekam-medis-pasien.component.css']
})
export class RekamMedisPasienComponent implements OnInit {

    API = API_CONFIG.API;

    ActionButton: ActionButtonModel[] = [
        {
            id: 'riwayat', icon: 'fas fa-history', caption: 'Riwayat Pelayanan Pasien'
        },
    ];

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;
    SelectedRekamMedis: string = "";

    ListRiwayat: InfoPasienModel[] = [];
    SelectedListRiwayat: InfoPasienModel = {} as any;
    SelectedListRiwayatIndex: number = 0;

    modalRef?: BsModalRef;
    @ViewChild('ModalRiwayat') ModalRiwayat!: TemplateRef<any>;

    PathFoto: string = "";

    @ViewChild('GridDetailResepComp') GridDetailResepComp!: GridComponent;
    GridDetailResepAttributes!: GridAttribute;

    @ViewChild('GridDetailTreatmentComp') GridDetailTreatmentComp!: GridComponent;
    GridDetailTreatmentAttributes!: GridAttribute;

    constructor(
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private billingService: BillingService,
        private pelayananPasienService: PelayananPasienService,
        private pendaftaranPasienService: PendaftaranPasienService,
    ) { }

    ngOnInit(): void {
        this.FilterDialogProp = {
            title: 'Pencarian Pasien',
            dynamicFilter: {
                columnName: `concat(per.nama_depan, ' ',per.nama_belakang)`,
                filter: 'like',
                searchText: '',
                searchText2: ''
            },
            searchUrl: this.API.PENDAFTARAN_PASIEN.GET_ALL_PERSON_PASIEN_DYNAMIC_FILTER,
            searchResultAttribute: {
                id: 'full_name',
                text: 'no_rekam_medis'
            }
        };

        this.GridDetailTreatmentAttributes = {
            column: [
                { field: 'id_transaksi', headerName: 'ID TRANSAKSI', hide: true },
                { field: 'kode_setup_tarif', headerName: 'KODE TREATMENT', },
                { field: 'nama_setup_tarif', headerName: 'NAMA TREATMENT', },
                { field: 'dokter', headerName: 'NAMA DOKTER', },
            ],
            dataSource: []
        };

        this.GridDetailResepAttributes = {
            column: [
                { field: 'id_transaksi_obat', headerName: 'ID TRANSAKSI OBAT', hide: true },
                { field: 'nama_obat', headerName: 'NAMA OBAT', },
                { field: 'qty', headerName: 'QTY', },
            ],
            dataSource: []
        };
    }

    handleClickActionButton(button: ActionButtonModel): void {
        switch (button.id) {
            case 'riwayat':
                if (this.SelectedListRiwayat) {
                    this.handleOpenModalRiwayat(this.SelectedListRiwayat);
                } else {
                    this.utilityService.onShowCustomAlert('warning', 'Oops', 'Tidak Ada Data yg Dipilih')
                }
                break;
            default:
                break;
        }
    }

    handleChooseFilterDialogPasien(args: IGetPersonForLookupAdmisiModel): void {
        this.SelectedRekamMedis = args.no_rekam_medis;

        const full_name = document.getElementById('full_name') as HTMLInputElement;
        full_name.value = args.full_name;

        const no_rekam_medis = document.getElementById('no_rekam_medis') as HTMLInputElement;
        no_rekam_medis.value = args.no_rekam_medis;

        const no_identitas = document.getElementById('no_identitas') as HTMLInputElement;
        no_identitas.value = args.no_identitas;

        this.onGetFotoPasien(args.id_person);

        this.onGetListRiwayat(args.no_rekam_medis);
    }

    onGetFotoPasien(id_person: number): void {
        this.pendaftaranPasienService.onGetLinkFotoPerson(id_person)
            .subscribe((result) => {
                this.PathFoto = result.data;
            })
    }

    onGetListRiwayat(no_rekam_medis: string): void {
        const parameter = [
            {
                "columnName": "p.no_rekam_medis",
                "filter": "like",
                "searchText": no_rekam_medis,
                "searchText2": ""
            }
        ];

        this.pelayananPasienService.onGetRiwayatAdmisiPasienByDynamicFilter(parameter)
            .subscribe((result) => {
                this.ListRiwayat = result.data[0].info_pasien;
                console.log(this.ListRiwayat);
            });
    }

    handleClickListRiwayat(item: any, index: number): void {
        this.SelectedListRiwayat = item;

        this.SelectedListRiwayatIndex = index;

        const elem = document.getElementById('cardListTreatment' + index) as HTMLElement;

        this.ListRiwayat.forEach((item, i) => {
            const el = document.getElementById('cardListTreatment' + i) as HTMLElement;

            if (i != index) {
                if (el.classList.contains('treatmentSelected')) {
                    el.classList.remove('treatmentSelected');
                }
            } else {
                elem.classList.add('treatmentSelected')
            }
        });
    }

    handleOpenModalRiwayat(data: InfoPasienModel): void {
        this.modalRef = this.bsModalService.show(this.ModalRiwayat, {
            backdrop: 'static',
            class: 'modal-lg'
        });

        this.GridDetailResepAttributes.dataSource = [];
        this.GridDetailTreatmentAttributes.dataSource = [];

        this.GridDetailResepAttributes.dataSource = data.resep;
        this.GridDetailTreatmentAttributes.dataSource = data.tindakan;
    }

    handleCetakNota(id_register: number): void {
        this.billingService.onPrintNotaInvoice(id_register);
    }
}
