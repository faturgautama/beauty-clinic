import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { IGetPersonForLookupAdmisiModel, ISaveAdmisiPasienModel } from 'src/app/model/pelayanan-pasien.model';
import { IPersonDokterModel } from 'src/app/model/setup-dokter.model';
import { PelayananPasienService } from 'src/app/services/pelayanan-pasien/pelayanan-pasien.service';
import { SetupDokterService } from 'src/app/services/setup-dokter/setup-dokter.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../api';

@Component({
    selector: 'app-pelayanan-pasien',
    templateUrl: './pelayanan-pasien.component.html',
    styleUrls: ['./pelayanan-pasien.component.css']
})
export class PelayananPasienComponent implements OnInit, AfterViewInit {

    API = API_CONFIG.API.PELAYANAN_PASIEN;

    @ViewChild('TabRef', { static: true }) TabRef!: TabComponent;

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;

    FormAdmisiPasien!: FormGroup;

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;

    @ViewChild('DropdownDokterComp') DropdownDokterComp!: DropDownListComponent;
    DropdownDokterDatasource: IPersonDokterModel[] = [];
    DropdownDokterField: Object = { text: 'full_name', value: 'id_dokter' };

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private setupDokterService: SetupDokterService,
        private pelayananPasienService: PelayananPasienService
    ) { }

    ngOnInit(): void {
        this.FormAdmisiPasien = this.formBuilder.group({
            id_person: [0, [Validators.required]],
            no_rekam_medis: ["", [Validators.required]],
            id_dokter: [0, [Validators.required]],
            keluhan: ["", [Validators.required]]
        });

        this.ActionButton = [
            { tabId: 'data_admisi', id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
            { tabId: 'admisi_pasien', id: 'reset', caption: 'Reset', icon: 'fas fa-undo' },
            { tabId: 'admisi_pasien', id: 'save', caption: 'Save', icon: 'fas fa-save' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Admisi',
            filter: [
                {
                    text: 'Nama Pasien',
                    value: 'per.nama_depan',
                    filter: 'like'
                },
                {
                    text: 'Tgl. Lahir',
                    value: 'per.tgl_lahir',
                    filter: 'between'
                },
                {
                    text: 'No. Identitas',
                    value: 'per.no_identitas',
                    filter: 'like'
                },
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_register', headerName: 'ID REGISTER', hide: true },
                { field: 'no_antrian', headerName: 'NO. ANTRIAN', },
                {
                    field: 'tgl_admisi', headerName: 'TGL. ADMISI',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data, 'Do/MM/yyyy') }
                },
                { field: 'no_rekam_medis', headerName: 'NO. REKAM MEDIS', },
                { field: 'no_register', headerName: 'NO. REGISTER', },
                { field: 'nama_pasien', headerName: 'NAMA PASIEN', },
                { field: 'gender', headerName: 'GENDER', },
                { field: 'umur', headerName: 'ALAMAT', },
            ],
            dataSource: []
        };

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
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.handleSearchFilter([]);

            this.setupDokterService.onGetAllPersonDokterByDynamicFilter([])
                .subscribe((result) => {
                    this.DropdownDokterDatasource = result.data;
                });
        }, 1);
    }

    onSetActionButton(tabId: string): ActionButtonModel[] {
        return this.ActionButton.filter((item) => {
            return item.tabId == tabId;
        });
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            case 'reset':
                this.handleResetFormAdmisiPasien();
                break;
            case 'save':
                this.handleSubmitFormAdmisiPasien(this.FormAdmisiPasien.value);
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.pelayananPasienService.onGetAllAdmisiPasienByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleChooseFilterDialog(args: IGetPersonForLookupAdmisiModel): void {
        this.id_person.setValue(args.id_person);

        const full_name = document.getElementById('full_name') as HTMLInputElement;
        full_name.value = args.full_name;

        this.no_rekam_medis.setValue(args.no_rekam_medis);

        const jenis_member = document.getElementById('jenis_member') as HTMLInputElement;
        jenis_member.value = args.jenis_member;
    }

    handleSubmitFormAdmisiPasien(args: ISaveAdmisiPasienModel): void {
        this.pelayananPasienService.onSaveAdmisiPasien(args)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Pelayanan Pasien Berhasil Disimpan')
                        .then(() => {
                            this.handleResetFormAdmisiPasien();
                            this.TabRef.onNavigateTab(0, 'data_pasien');
                            this.handleSearchFilter([]);
                        });
                }
            });
    }

    handleResetFormAdmisiPasien(): void {
        this.FormAdmisiPasien.reset();
        this.id_person.setValue(0);
        this.no_rekam_medis.setValue('');
        this.id_dokter.setValue(0);
        this.keluhan.setValue('');

        const full_name = document.getElementById('full_name') as HTMLInputElement;
        full_name.value = "";

        const jenis_member = document.getElementById('jenis_member') as HTMLInputElement;
        jenis_member.value = "";

        this.DropdownDokterComp.value = null as any;
    }

    get id_person(): AbstractControl { return this.FormAdmisiPasien.get('id_person') as AbstractControl };
    get no_rekam_medis(): AbstractControl { return this.FormAdmisiPasien.get('no_rekam_medis') as AbstractControl };
    get id_dokter(): AbstractControl { return this.FormAdmisiPasien.get('id_dokter') as AbstractControl };
    get keluhan(): AbstractControl { return this.FormAdmisiPasien.get('keluhan') as AbstractControl };
}
