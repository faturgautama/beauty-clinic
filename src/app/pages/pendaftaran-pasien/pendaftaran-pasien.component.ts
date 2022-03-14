import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridAttribute, GridComponent } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { FilterComponent, FilterModel, OffcanvasFilterModel } from 'src/app/components/navigation/filter/filter.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-pendaftaran-pasien',
    templateUrl: './pendaftaran-pasien.component.html',
    styleUrls: ['./pendaftaran-pasien.component.css']
})
export class PendaftaranPasienComponent implements OnInit {

    @ViewChild('TabRef', { static: true }) TabRef!: TabComponent;

    ActionButton: ActionButtonModel[] = [];

    FormPendaftaranPasien!: FormGroup;

    @ViewChild('FilterComp') FilterComp!: FilterComponent;
    FilterAttribute!: OffcanvasFilterModel;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;

    GenderDatasource = [
        { text: 'Laki - Laki', value: 'L' },
        { text: 'Wanita', value: 'W' },
    ];

    GenderField: Object = { text: 'text', value: 'value' };

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        this.onSetFormPendaftaranPasienAttributes();

        this.ActionButton = [
            { tabId: 'data_pasien', id: 'filter', caption: 'Filter', icon: 'fas fa-filter' },
            { tabId: 'pendaftaran_pasien', id: 'reset', caption: 'Reset', icon: 'fas fa-undo' },
            { tabId: 'pendaftaran_pasien', id: 'save', caption: 'Save', icon: 'fas fa-save' },
        ];

        this.FilterAttribute = {
            title: 'Filter Pencarian Data Pasien',
            filter: [
                {
                    text: 'Nama Pasien',
                    value: 'p.nama_pasien',
                    filter: 'like'
                },
                {
                    text: 'Tgl. Register',
                    value: 'p.tgl_register',
                    filter: 'between'
                },
                {
                    text: 'No. Register',
                    value: 'p.no_register',
                    filter: 'like'
                },
            ]
        };

        this.GridAttributes = {
            column: [
                { field: 'id_pasien', headerName: 'ID PASIEN', hide: true },
                { field: 'no_register', headerName: 'NO. REGISTER', },
                { field: 'tgl_register', headerName: 'TGL. REGISTER', cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data, 'Do/MM/yyyy') } },
                { field: 'no_identitas', headerName: 'NO. IDENTITAS', },
                { field: 'nama_pasien', headerName: 'NAMA PASIEN', },
                { field: 'tgl_lahir', headerName: 'TGL. LAHIR', },
                { field: 'gender', headerName: 'GENDER', },
                { field: 'alamat', headerName: 'ALAMAT', },
                { field: 'no_handphone', headerName: 'NO. HANDPHONE', },
            ],
            dataSource: [
                {
                    id_pasien: 1,
                    no_register: 'A01',
                    tgl_register: new Date(),
                    no_identitas: '3374100408912123',
                    nama_pasien: 'John Doe',
                    tgl_lahir: '04/08/1997',
                    gender: 'Laki - Laki',
                    alamat: 'Jalan Raya Semarang No. 1',
                    no_handphone: '085156781165',
                },
                {
                    id_pasien: 2,
                    no_register: 'A02',
                    tgl_register: new Date(),
                    no_identitas: '3374100408912123',
                    nama_pasien: 'Jane Doe',
                    tgl_lahir: '04/08/1997',
                    gender: 'Wanita',
                    alamat: 'Jalan Raya Semarang No. 2',
                    no_handphone: '085156781165',
                }
            ]
        };
    }

    onSetActionButton(tabId: string): ActionButtonModel[] {
        return this.ActionButton.filter((item) => {
            return item.tabId == tabId;
        });
    }

    onSetFormPendaftaranPasienAttributes(): void {
        this.FormPendaftaranPasien = this.formBuilder.group({
            no_identitas: ['', [Validators.required]],
            nama_pasien: ['', [Validators.required]],
            tgl_lahir: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            alamat: ['', [Validators.required]],
            no_handphone: ['', [Validators.required]],
        })
    }

    handleSelectedTab(tabId: string): void {
        // console.log(tabId);
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'filter':
                this.FilterComp.handleOpenFilter();
                break;
            case 'reset':
                this.handleResetFormPendaftaranPasien();
                break;
            case 'save':
                this.handleSubmitFormPendaftaranPasien(this.FormPendaftaranPasien.value);
                break;
            default:
                break;
        }
    }

    handleSearchFilter(args: FilterModel[]): void {
        console.log(args);
    }

    handleSubmitFormPendaftaranPasien(args: any): void {
        const index = this.GridAttributes.dataSource.length;

        args.id_pasien = index + 1;
        args.no_register = `A0${index + 1}`;
        args.tgl_register = new Date();

        this.GridComp.onAddData(args);

        this.utilityService.onShowCustomAlert('success', 'Success', 'Pendaftaran Pasien Berhasil')
            .then(() => {
                this.TabRef.onNavigateTab(0, 'data_pasien');
            });
    }

    handleResetFormPendaftaranPasien(): void {
        this.FormPendaftaranPasien.reset();
        this.no_identitas.setValue('');
        this.nama_pasien.setValue('');
        this.tgl_lahir.setValue('');
        this.gender.setValue('');
        this.alamat.setValue('');
        this.no_handphone.setValue('');
    }

    get no_identitas(): AbstractControl { return this.FormPendaftaranPasien.get('no_identitas') as AbstractControl }
    get nama_pasien(): AbstractControl { return this.FormPendaftaranPasien.get('nama_pasien') as AbstractControl }
    get tgl_lahir(): AbstractControl { return this.FormPendaftaranPasien.get('tgl_lahir') as AbstractControl }
    get gender(): AbstractControl { return this.FormPendaftaranPasien.get('gender') as AbstractControl }
    get alamat(): AbstractControl { return this.FormPendaftaranPasien.get('alamat') as AbstractControl }
    get no_handphone(): AbstractControl { return this.FormPendaftaranPasien.get('no_handphone') as AbstractControl }
}
