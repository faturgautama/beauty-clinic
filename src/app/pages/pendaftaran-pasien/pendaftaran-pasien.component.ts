import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridAttribute, GridComponent } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { IJenisIdentitasModel, IPendaftaranPasienBaruModel, IUpdatePasienModel } from 'src/app/model/pendaftaran-pasien.model';
import { PendaftaranPasienService } from 'src/app/services/pendaftaran-pasien/pendaftaran-pasien.service';
import { GridButtonComponent } from 'src/app/components/grid/grid-button/grid-button.component';

@Component({
    selector: 'app-pendaftaran-pasien',
    templateUrl: './pendaftaran-pasien.component.html',
    styleUrls: ['./pendaftaran-pasien.component.css']
})
export class PendaftaranPasienComponent implements OnInit, AfterViewInit {

    @ViewChild('TabRef', { static: true }) TabRef!: TabComponent;

    ActionButton: ActionButtonModel[] = [];

    FormPendaftaranPasien!: FormGroup;
    FormPendaftaranPasienState: 'insert' | 'update' = 'insert';

    @ViewChild('JenisIdentitasComp') JenisIdentitasComp!: DropDownListComponent;
    JenisIdentitasDatasource: IJenisIdentitasModel[] = [];
    JenisIdentitasField: Object = { text: 'jenis_identitas', value: 'id_jenis_identitas' };

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;
    FrameworkComponents: any;

    GenderDatasource = [
        { text: 'Laki - Laki', value: 'L' },
        { text: 'Wanita', value: 'P' },
    ];

    GenderField: Object = { text: 'text', value: 'value' };

    PathFotoLocation: any;
    url: any;

    PathFotoPasien: string = "";

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private pendaftaranPasienService: PendaftaranPasienService
    ) {
        this.FrameworkComponents = {
            buttonRenderer: GridButtonComponent
        }
    }

    ngOnInit(): void {
        this.onSetFormPendaftaranPasienAttributes();

        this.ActionButton = [
            { tabId: 'data_pasien', id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
            { tabId: 'data_pasien', id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
            { tabId: 'pendaftaran_pasien', id: 'reset', caption: 'Reset', icon: 'fas fa-undo' },
            { tabId: 'pendaftaran_pasien', id: 'save', caption: 'Save', icon: 'fas fa-save' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Pasien',
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
                { field: 'id_person', headerName: 'ID PASIEN', hide: true },
                { field: 'no_identitas', headerName: 'NO. IDENTIAS', },
                { field: 'no_rekam_medis', headerName: 'NO. REKAM MEDIS', },
                { field: 'full_name', headerName: 'NAMA PASIEN', },
                { field: 'tgl_lahir', headerName: 'TGL. LAHIR', cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data, 'Do/MM/yyyy') } },
                { field: 'gender', headerName: 'GENDER', },
                { field: 'alamat_lengkap', headerName: 'ALAMAT', },
                { field: 'no_hp_1', headerName: 'NO. HANDPHONE', },
                // {
                //     headerName: 'EDIT', cellRenderer: 'buttonRenderer', cellRendererParams: {
                //         onClick: this.handleDoEditPasien.bind(this),
                //         Caption: 'fa-edit',
                //         Class: 'btn-warning text-white'
                //     },
                //     cellClass: 'text-center',
                //     headerClass: 'text-center'
                // },
            ],
            dataSource: []
        };
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.handleSearchFilter([]);

            this.onGetAllJenisIdentitas();
        }, 1);
    }

    onSetActionButton(tabId: string): ActionButtonModel[] {
        return this.ActionButton.filter((item) => {
            return item.tabId == tabId;
        });
    }

    onSetFormPendaftaranPasienAttributes(): void {
        this.FormPendaftaranPasien = this.formBuilder.group({
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
            pasien: this.formBuilder.group({
                keterangan: ['', []]
            })
        });
    }

    handleSelectedTab(tabId: string, data?: IPendaftaranPasienBaruModel): void {
        if (tabId == "pendaftaran_pasien") {
            setTimeout(() => {
                if (data) {
                    this.FormPendaftaranPasien.setValue(data);
                }
            }, 500);
        }
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'edit':
                this.ActionButton = [
                    { tabId: 'data_pasien', id: 'edit', caption: 'Edit', icon: 'fas fa-edit' },
                    { tabId: 'data_pasien', id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
                    { tabId: 'pendaftaran_pasien', id: 'reset', caption: 'Reset', icon: 'fas fa-undo' },
                    { tabId: 'pendaftaran_pasien', id: 'update', caption: 'Update', icon: 'fas fa-save' },
                ];
                this.handleDoEditPasien(this.GridSelectedData);
                break;
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            case 'reset':
                this.handleResetFormPendaftaranPasien();
                break;
            case 'save':
                this.handleSubmitFormPendaftaranPasien(this.FormPendaftaranPasien.value);
                break;
            case 'update':
                this.handleUpdateFormPendaftaranPasien(this.FormPendaftaranPasien.value);
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        this.pendaftaranPasienService.onGetAllPersonPasienByDynamicFilter(args)
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;

        this.pendaftaranPasienService.onGetLinkFotoPerson(args.id_person)
            .subscribe((result) => {
                this.PathFotoPasien = result.data;
            });
    }

    onGetAllJenisIdentitas(): void {
        this.pendaftaranPasienService.onGetAllJenisIdentitas()
            .subscribe((result) => {
                this.JenisIdentitasDatasource = result.data;
            })
    }

    onSelectFotoPasien(event: any, value: any): void {
        const target = event?.target as HTMLInputElement;

        this.PathFotoLocation = (target.files as FileList)[0];

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed
                this.url = event?.target?.result;
            }
        };
    }

    handleSubmitFormPendaftaranPasien(args: IPendaftaranPasienBaruModel): void {
        this.pendaftaranPasienService.onSavePendaftaranPasienBaru(args)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Pendaftaran Pasien Berhasil')
                        .then(() => {
                            if (this.url) {
                                this.onUploadFotoPasien(result.data, this.PathFotoLocation);
                            } else {
                                this.handleResetFormPendaftaranPasien();
                                this.TabRef.onNavigateTab(0, 'data_pasien');
                                this.handleSearchFilter([]);
                            }
                        });
                }
            });
    }

    onUploadFotoPasien(id_person: number, path_foto: string): void {
        const formData: FormData = new FormData();

        formData.append('id_person', id_person.toString());
        formData.append('form_file', path_foto);

        this.pendaftaranPasienService.onUploadFotoPasien(formData)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Foto Pasien Berhasil Diupload')
                        .then(() => {
                            this.handleResetFormPendaftaranPasien();
                            this.TabRef.onNavigateTab(0, 'data_pasien');
                            this.handleSearchFilter([]);
                        })
                }
            })
    }

    handleResetFormPendaftaranPasien(): void {
        this.FormPendaftaranPasien.reset();
        this.no_identitas.setValue('');
        this.nomor_kartu.setValue('');
        this.nama_depan.setValue('');
        this.nama_belakang.setValue('');
        this.gender.setValue('');
        this.tempat_lahir.setValue('');
        this.tanggal_lahir.setValue('');
        this.alamat_lengkap.setValue('');
        this.no_hp_1.setValue('');
        this.no_hp_2.setValue('');
        this.no_hp_3.setValue('');

        this.PathFotoLocation = null;

        const path_foto = document.getElementById('path_foto') as HTMLInputElement;
        path_foto.value = null as any;

        this.FormPendaftaranPasienState = 'insert';
        this.PathFotoPasien = '';
    }

    handleDoEditPasien(data: any): void {
        this.FormPendaftaranPasienState = 'update';

        const btnpendaftaran_pasien = document.getElementById('btnpendaftaran_pasien') as HTMLElement;
        btnpendaftaran_pasien.click();

        const parameter = {
            pasien: {
                keterangan: ''
            },
            person: {
                id_person: data.id_person,
                id_jenis_identitas: 1,
                no_identitas: data.no_identitas,
                nomor_kartu: data.nomor_kartu ? data.nomor_kartu : "",
                nama_depan: data.full_name.split(' ')[0],
                nama_belakang: data.full_name.split(' ')[1],
                gender: data.gender == "PEREMPUAN" ? 'P' : 'L',
                tempat_lahir: data.tempat_lahir ? data.tempat_lahir : '',
                tanggal_lahir: data.tgl_lahir ? data.tgl_lahir : '',
                alamat_lengkap: data.alamat_lengkap,
                no_hp_1: data.no_hp_1,
                no_hp_2: data.no_hp_2,
                no_hp_3: data.no_hp_3,
                path_foto: "",
                nama_foto: ""
            }
        };

        this.FormPendaftaranPasien.setValue(parameter);
    }

    handleUpdateFormPendaftaranPasien(args: any): void {
        const person = args.person;

        person['id_jenis_member'] = 0;

        this.pendaftaranPasienService.onPutUpdatePasien(person as IUpdatePasienModel)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Update Pasien Berhasil')
                        .then(() => {
                            if (this.url) {
                                this.onUploadFotoPasien(person.id_person, this.PathFotoLocation);
                            } else {
                                this.handleResetFormPendaftaranPasien();
                                this.TabRef.onNavigateTab(0, 'data_pasien');
                                this.handleSearchFilter([]);
                            }
                        });
                }
            });
    }

    get id_jenis_identitas(): AbstractControl { return this.FormPendaftaranPasien.get('person.id_jenis_identitas') as AbstractControl }
    get no_identitas(): AbstractControl { return this.FormPendaftaranPasien.get('person.no_identitas') as AbstractControl }
    get nomor_kartu(): AbstractControl { return this.FormPendaftaranPasien.get('person.nomor_kartu') as AbstractControl }
    get nama_depan(): AbstractControl { return this.FormPendaftaranPasien.get('person.nama_depan') as AbstractControl }
    get nama_belakang(): AbstractControl { return this.FormPendaftaranPasien.get('person.nama_belakang') as AbstractControl }
    get gender(): AbstractControl { return this.FormPendaftaranPasien.get('person.gender') as AbstractControl }
    get tempat_lahir(): AbstractControl { return this.FormPendaftaranPasien.get('person.tempat_lahir') as AbstractControl }
    get tanggal_lahir(): AbstractControl { return this.FormPendaftaranPasien.get('person.tanggal_lahir') as AbstractControl }
    get alamat_lengkap(): AbstractControl { return this.FormPendaftaranPasien.get('person.alamat_lengkap') as AbstractControl }
    get no_hp_1(): AbstractControl { return this.FormPendaftaranPasien.get('person.no_hp_1') as AbstractControl }
    get no_hp_2(): AbstractControl { return this.FormPendaftaranPasien.get('person.no_hp_2') as AbstractControl }
    get no_hp_3(): AbstractControl { return this.FormPendaftaranPasien.get('person.no_hp_3') as AbstractControl }
    get keterangan(): AbstractControl { return this.FormPendaftaranPasien.get('pasien.keterangan') as AbstractControl }
}
