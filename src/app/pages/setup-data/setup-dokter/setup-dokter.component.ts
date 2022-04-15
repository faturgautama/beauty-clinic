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
    FormPendaftaranDokterState: 'insert' | 'update' = 'insert';

    @ViewChild('JenisIdentitasComp') JenisIdentitasComp!: DropDownListComponent;
    JenisIdentitasDatasource: IJenisIdentitasModel[] = [];
    JenisIdentitasField: Object = { text: 'jenis_identitas', value: 'id_jenis_identitas' };

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

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
            { tabId: 'data_dokter', id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
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
                id_person: [0, []],
                id_jenis_identitas: [0, [Validators.required]],
                no_identitas: ['', [Validators.required]],
                nomor_kartu: ['', []],
                nama_depan: ['', [Validators.required]],
                nama_belakang: ['', [Validators.required]],
                gender: ['', [Validators.required]],
                tempat_lahir: ['', [Validators.required]],
                tanggal_lahir: ['', [Validators.required]],
                alamat_lengkap: ['', [Validators.required]],
                no_hp_1: ['', [Validators.required]],
                no_hp_2: ['', []],
                no_hp_3: ['', []],
                path_foto: ['', []],
                nama_foto: ['', []],
            }),
            dokter: this.formBuilder.group({
                id_dokter: [0, []],
                no_surat_ijin_praktek: ['', []],
                tgl_exp_surat_ijin_praktek: ['', []],
                no_str: ['', []],
                tgl_exp_str: ['', []],
            })
        });
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'edit':
                this.ActionButton = [
                    { tabId: 'data_dokter', id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
                    { tabId: 'data_dokter', id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
                    { tabId: 'input_dokter', id: 'reset', caption: 'Reset', icon: 'fas fa-undo' },
                    { tabId: 'input_dokter', id: 'update', caption: 'Update', icon: 'fas fa-save' },
                ];
                this.handleDoEditDokter(this.GridSelectedData);
                break;
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            case 'reset':
                this.handleResetFormPendaftaranDokter();
                break;
            case 'save':
                this.handleSubmitFormPendaftaranDokter(this.FormPendaftaranDokter.value);
                break;
            case 'update':
                this.handleUpdateFormPendaftaranDokter(this.FormPendaftaranDokter.value);
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

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
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

    handleDoEditDokter(data: any): void {
        this.FormPendaftaranDokterState = 'update';

        this.setupDokterService.onGetDetailDokter(data.id_person)
            .subscribe((result) => {
                const person = result.data.person;

                delete person.id_jenis_member;
                delete person.is_active;
                delete person.jenis_member;
                delete person.time_created;
                delete person.time_deactived;
                delete person.user_created;
                delete person.user_deactived;
                delete person.nama_panggilan;

                person.nomor_kartu = "";

                const dokter = result.data.dokter;

                delete dokter.id_person;
                delete dokter.is_active;
                delete dokter.kode_dokter;
                delete dokter.time_created;
                delete dokter.time_deactived;
                delete dokter.user_created;
                delete dokter.user_deactived;

                const parameter = {
                    person: person,
                    dokter: dokter,
                };

                this.FormPendaftaranDokter.setValue(parameter);
            }, (error) => {

            }, () => {
                const btninput_dokter = document.getElementById('btninput_dokter') as HTMLElement;
                btninput_dokter.click();
            });
    }

    handleUpdateFormPendaftaranDokter(args: any): void {
        const person = args.person;
        person['id_jenis_member'] = 0;

        const dokter = args.dokter;

        this.pendaftaranPasienService.onPutUpdatePasien(person as any)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.setupDokterService.onPutUpdateDokter(dokter)
                        .subscribe((result) => {
                            this.utilityService.onShowCustomAlert('success', 'Success', 'Update Dokter Berhasil')
                                .then(() => {
                                    this.handleResetFormPendaftaranDokter();
                                    this.TabRef.onNavigateTab(0, 'data_dokter');
                                    this.handleSearchFilter([]);
                                });
                        })
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
        this.no_hp_1.setValue('');
        this.no_hp_2.setValue('');
        this.no_hp_3.setValue('');
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
    get no_hp_1(): AbstractControl { return this.FormPendaftaranDokter.get('person.no_hp_1') as AbstractControl }
    get no_hp_2(): AbstractControl { return this.FormPendaftaranDokter.get('person.no_hp_2') as AbstractControl }
    get no_hp_3(): AbstractControl { return this.FormPendaftaranDokter.get('person.no_hp_3') as AbstractControl } get no_surat_ijin_praktek(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.no_surat_ijin_praktek') as AbstractControl }
    get tgl_exp_surat_ijin_praktek(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.tgl_exp_surat_ijin_praktek') as AbstractControl }
    get no_str(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.no_str') as AbstractControl }
    get tgl_exp_str(): AbstractControl { return this.FormPendaftaranDokter.get('dokter.tgl_exp_str') as AbstractControl }
}
