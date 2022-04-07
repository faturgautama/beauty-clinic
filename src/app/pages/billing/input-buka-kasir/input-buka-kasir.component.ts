import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { ISetupUserModel } from 'src/app/model/setup-user.model';
import { SettingKasirService } from 'src/app/services/setting-kasir/setting-kasir.service';
import { SetupUserService } from 'src/app/services/setup-user/setup-user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { IInsertBukaKasirModel } from 'src/app/model/setting-kasir.model';

@Component({
    selector: 'app-input-buka-kasir',
    templateUrl: './input-buka-kasir.component.html',
    styleUrls: ['./input-buka-kasir.component.css']
})
export class InputBukaKasirComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormBukaKasir!: FormGroup;

    modalRef?: BsModalRef;
    @ViewChild('ModalBukaKasir') ModalBukaKasir!: TemplateRef<any>;

    DropdownUserKasirDatasource: ISetupUserModel[] = [];
    DropdownUserKasirField: Object = { text: 'full_name', value: 'id_user' };

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private setupUserService: SetupUserService,
        private settingKasirService: SettingKasirService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'add', caption: 'Add', icon: 'fas fa-plus' },
        ];

        this.GridAttributes = {
            column: [
                { field: 'id_saldo_kasir', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'nomor_saldo_kasir', headerName: 'NO. FAKTUR', minWidth: 200 },
                { field: 'user_name', headerName: 'USER KASIR', minWidth: 100 },
                {
                    field: 'waktu_buka_kasir', headerName: 'WAKTU BUKA KASIR',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data.value, 'Do/MM/yyyy HH:mm:ss') }
                },
                {
                    field: 'jumlah_modal_awal', headerName: 'JUMLAH MODAL',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };

        this.FormBukaKasir = this.formBuilder.group({
            user_kasir: [0, [Validators.required]],
            jumlah_modal_awal: [0, [Validators.required]],
        });

        this.setupUserService.onGetAllUserKasir()
            .subscribe((result) => {
                this.DropdownUserKasirDatasource = result.data;
            });

        this.handleSearchFilter();
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'add':
                this.onOpenModalInsertUpdate();
                break;
            default:
                break;
        }
    }

    handleSearchFilter(): void {
        this.settingKasirService.onGetRiwayatBukaKasir()
            .subscribe((result) => {
                this.GridAttributes.dataSource = result.data;
            });
    }

    handleSelectionChanged(args: any): void {
        this.GridSelectedData = args;
    }

    onOpenModalInsertUpdate(): void {
        this.modalRef = this.bsModalService.show(this.ModalBukaKasir, {
            backdrop: 'static'
        });

        this.onResetForm();
    }

    onSubmitForm(FormBukaKasir: IInsertBukaKasirModel): void {
        let parameter: IInsertBukaKasirModel = {
            user_kasir: FormBukaKasir.user_kasir,
            jumlah_modal_awal: FormBukaKasir.jumlah_modal_awal,
        };

        this.settingKasirService.onPostBukaKasir(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Buka Kasir Berhasil Disimpan')
                        .then(() => {
                            this.modalRef?.hide();
                            this.handleSearchFilter();
                        });
                };
            });
    }

    onResetForm(): void {
        this.FormBukaKasir.reset();
        this.user_kasir.setValue("");
        this.jumlah_modal_awal.setValue("");
    }

    get user_kasir(): AbstractControl { return this.FormBukaKasir.get('user_kasir') as AbstractControl };
    get jumlah_modal_awal(): AbstractControl { return this.FormBukaKasir.get('jumlah_modal_awal') as AbstractControl };
}
