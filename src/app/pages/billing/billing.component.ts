import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { IGetPersonForLookupAdmisiModel } from 'src/app/model/pelayanan-pasien.model';
import { PelayananPasienService } from 'src/app/services/pelayanan-pasien/pelayanan-pasien.service';
import { SetupDokterService } from 'src/app/services/setup-dokter/setup-dokter.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../api';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    API = API_CONFIG.API.PELAYANAN_PASIEN;

    @ViewChild('TabRef', { static: true }) TabRef!: TabComponent;

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;

    DetailDatasource: any;

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private setupDokterService: SetupDokterService,
        private pelayananPasienService: PelayananPasienService
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
            searchUrl: this.API.LOOKUP_PERSON_FOR_ADMISI,
            searchResultAttribute: {
                id: 'full_name',
                text: 'no_rekam_medis'
            }
        };

        this.DetailDatasource = {
            treatment: [
                { id: 1, nama_tarif: 'FACIAL MUKA', nominal: 50000 },
                { id: 2, nama_tarif: 'SUNTIK PEMUTIH', nominal: 150000 },
                { id: 3, nama_tarif: 'LASER', nominal: 250000 },
            ],
            skincare: [
                { id: 1, nama_skincare: 'TONER A', nominal: 50000 },
                { id: 2, nama_skincare: 'FACE WASH', nominal: 50000 },
            ],
            resep: [
                { id: 1, nama_obat: 'CREAM PAGI', nominal: 75000 },
                { id: 2, nama_obat: 'CREAM SIANG', nominal: 75000 },
                { id: 3, nama_obat: 'CREAM MALAM', nominal: 75000 },
            ]
        }
    }

    handleChooseFilterDialog(args: IGetPersonForLookupAdmisiModel): void {
        console.log(args);
    }


}
