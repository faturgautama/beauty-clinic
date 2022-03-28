import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { IJenisIdentitasModel } from 'src/app/model/pendaftaran-pasien.model';
import { ISetupDokterModel } from 'src/app/model/setup-dokter.model';
import { PendaftaranPasienService } from 'src/app/services/pendaftaran-pasien/pendaftaran-pasien.service';
import { SetupDokterService } from 'src/app/services/setup-dokter/setup-dokter.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-setup-dokter',
    templateUrl: './setup-dokter.component.html',
    styleUrls: ['./setup-dokter.component.css']
})
export class SetupDokterComponent implements OnInit {

    @ViewChild('TabRef', { static: true }) TabRef!: TabComponent;

    ActionButton: ActionButtonModel[] = [];

    FormPendaftaranDokter!: FormGroup;

    @ViewChild('JenisIdentitasComp') JenisIdentitasComp!: DropDownListComponent;
    JenisIdentitasDatasource: IJenisIdentitasModel[] = [];
    JenisIdentitasField: Object = { text: 'jenis_identitas', value: 'id_jenis_identitas' };

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;

    GenderDatasource = [
        { text: 'Laki - Laki', value: 'L' },
        { text: 'Wanita', value: 'P' },
    ];

    GenderField: Object = { text: 'text', value: 'value' };

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private setupDokterService: SetupDokterService,
        private pendaftaranPasienService: PendaftaranPasienService
    ) { }

    ngOnInit(): void {
        this.onSetFormSetupDokterAttributes();

        this.ActionButton = [
            { tabId: 'data_dokter', id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
            { tabId: 'input_dokter', id: 'reset', caption: 'Reset', icon: 'fas fa-undo' },
            { tabId: 'input_dokter', id: 'save', caption: 'Save', icon: 'fas fa-save' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Pasien',
            filter: [
                {
                    text: 'Nama Dokter',
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
                { field: 'id_person', headerName: 'ID PASIEN', hide: true },
                { field: 'no_identitas', headerName: 'NO. IDENTIAS', },
                { field: 'kode_dokter', headerName: 'KODE DOKTER', },
                { field: 'full_name', headerName: 'NAMA DOKTER', },
                { field: 'tgl_lahir', headerName: 'TGL. LAHIR', cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data, 'Do/MM/yyyy') } },
                { field: 'gender', headerName: 'GENDER', },
                { field: 'alamat_lengkap', headerName: 'ALAMAT', },
                { field: 'no_hp', headerName: 'NO. HANDPHONE', },
            ],
            dataSource: []
        };

        this.handleSearchFilter([]);

        this.onGetAllJenisIdentitas();
    }

    onSetActionButton(tabId: string): ActionButtonModel[] {
        return this.ActionButton.filter((item) => {
            return item.tabId == tabId;
        });
    }

    onSetFormSetupDokterAttributes(): void {
        this.FormPendaftaranDokter = this.formBuilder.group({
            person: this.formBuilder.group({
                id_jenis_identitas: [0, [Validators.required]],
                no_identitas: ['', [Validators.required]],
                nama_depan: ['', [Validators.required]],
                nama_belakang: ['', [Validators.required]],
                gender: ['', [Validators.required]],
                tempat_lahir: ['', [Validators.required]],
                tanggal_lahir: ['', [Validators.required]],
                alamat_lengkap: ['', [Validators.required]],
                no_hp: ['', [Validators.required]],
            }),
            dokter: this.formBuilder.group({
                no_surat_ijin_praktek: ['', []],
                tgl_exp_surat_ijin_praktek: ['', []],
                no_str: ['', []],
                tgl_exp_str: ['', []],
            })
        });
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            case 'reset':
                this.handleResetFormPendaftaranDokter();
                break;
            case 'save':
                this.handleSubmitFormPendaftaranDokter(this.FormPendaftaranDokter.value);
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.setupDokterService.onGetAllPersonDokterByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    onGetAllJenisIdentitas(): void {
        this.pendaftaranPasienService.onGetAllJenisIdentitas()
            .subscribe((result) => {
                this.JenisIdentitasDatasource = result.data;
            })
    }

    handleSubmitFormPendaftaranDokter(args: ISetupDokterModel): void {
        this.setupDokterService.onSaveSetupDokter(args)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Setup Dokter Berhasil')
                        .then(() => {
                            this.TabRef.onNavigateTab(0, 'data_dokter');
                            this.handleSearchFilter([]);
                        });
                }
            });
    }

    handleResetFormPendaftaranDokter(): void {
        this.FormPendaftaranDokter.reset();
        this.no_identitas.setValue('');
        this.nama_depan.setValue('');
        this.nama_belakang.setValue('');
        this.gender.setValue('');
        this.tempat_lahir.setValue('');
        this.tanggal_lahir.setValue('');
        this.alamat_lengkap.setValue('');
        this.no_hp.setValue('');
        this.no_surat_ijin_praktek.setValue('');
        this.tgl_exp_surat_ijin_praktek.setValue('');
        this.no_str.setValue('');
        this.tgl_exp_str.setValue('');
    }

    get id_jenis_identitas(): AbstractControl { return this.FormPendaftaranDokter.get('person.id_jenis_identitas') as AbstractControl }
    get no_identitas(): AbstractControl { return this.FormPendaftaranDokter.get('person.no_identitas') as AbstractControl }
    get nama_depan(): AbstractControl { return this.FormPendaftaranDokter.get('person.nama_depan') as AbstractControl }
    get nama_belakang(): AbstractControl { return this.FormPendaftaranDokter.get('person.nama_belakang') as AbstractControl }
    get gender(): AbstractControl { return this.FormPendaftaranDokter.get('person.gender') as AbstractControl }
    get tempat_lahir(): AbstractControl { return this.FormPendaftaranDokter.get('person.tempat_lahir') as AbstractControl }
    get tanggal_lahir(): AbstractControl { return this.FormPendaftaranDokter.get('person.tanggal_lahir') as AbstractControl }
    get alamat_lengkap(): AbstractControl { return this.FormPendaftaranDokter.get('person.alamat_lengkap') as AbstractControl }
    get no_hp(): AbstractControl { return this.FormPendaftaranDokter.get('person.no_hp') as AbstractControl }
    get no_surat_ijin_praktek(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.no_surat_ijin_praktek') as AbstractControl }
    get tgl_exp_surat_ijin_praktek(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.tgl_exp_surat_ijin_praktek') as AbstractControl }
    get no_str(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.no_str') as AbstractControl }
    get tgl_exp_str(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.tgl_exp_str') as AbstractControl }
}
