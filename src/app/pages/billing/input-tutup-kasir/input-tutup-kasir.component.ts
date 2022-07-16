import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { ActionButtonModel } from 'src/app/components/navigation/action-button/action-button.component';
import { IInsertTutupKasirModel, IInsertTutupKasirSpesialModel, IRekapPendapatanKasirSpesialModel } from 'src/app/model/setting-kasir.model';
import { SettingKasirService } from 'src/app/services/setting-kasir/setting-kasir.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-input-tutup-kasir',
    templateUrl: './input-tutup-kasir.component.html',
    styleUrls: ['./input-tutup-kasir.component.css']
})
export class InputTutupKasirComponent implements OnInit {

    ActionButton: ActionButtonModel[] = [];

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    FormTutupKasir!: FormGroup;
    FormRekapPayment!: FormArray;

    modalRef?: BsModalRef;
    @ViewChild('ModalTutupKasir') ModalTutupKasir!: TemplateRef<any>;

    ListPayment: any[] = [];

    ListRekap: IRekapPendapatanKasirSpesialModel[] = [];

    TotalPenerimaan: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private settingKasirService: SettingKasirService,
    ) { }

    ngOnInit(): void {
        this.ActionButton = [
            { id: 'save', caption: 'Save', icon: 'fas fa-save' },
        ];

        this.GridAttributes = {
            column: [
                { field: 'id_saldo_kasir', headerName: 'ID SALDO KASIR', hide: true },
                { field: 'nomor_saldo_kasir', headerName: 'NO. FAKTUR', minWidth: 200 },
                { field: 'user_kasir', headerName: 'USER KASIR', minWidth: 100 },
                {
                    field: 'waktu_tutup_kasir', headerName: 'WAKTU TUTUP KASIR',
                    cellRenderer: (data: any) => { return this.utilityService.onFormatDate(data, 'Do/MM/yyyy') }
                },
                {
                    field: 'jumlah_modal_awal', headerName: 'JUMLAH MODAL',
                    cellRenderer: (data: any) => { return formatCurrency(data, 'EN', 'Rp. ') }
                },
                {
                    field: 'jumlah_penerimaan_ver_kasir', headerName: 'JUMLAH PENERIMAAN',
                    cellRenderer: (data: any) => { return formatCurrency(data, 'EN', 'Rp. ') }
                },
            ],
            dataSource: []
        };

        this.FormTutupKasir = this.formBuilder.group({
            keterangan_tutup_kasir: ["", [Validators.required]],
            selisih: [0, [Validators.required]],
            kelebihan: [0, [Validators.required]],
            // rekap_payment_kasir: [[], [Validators.required]]
        });

        this.onGetRekap();
    }

    onGetRekap(): void {
        this.settingKasirService.onGetPendapatanKasirSpesial()
            .subscribe((result) => {
                if (result.responseResult) {
                    this.ListRekap = result.data.daftar_invoice;
                    this.ListPayment = result.data.rekap_payment_method;
                }
            });
    }

    handleClickActionButton(args: ActionButtonModel): void {
        switch (args.id) {
            case 'save':
                this.onSubmitForm(this.FormTutupKasir.value);
                break;
            default:
                break;
        }
    }

    handleChangeJumlahPenerimaan(args: any, index: number): void {
        this.ListPayment[index]['jumlah_penerimaan'] = args.value;

        this.onCountJumlahPendapatanKasir();
    }

    onCountJumlahPendapatanKasir(): void {
        let jumlah_pendapatan_kasir = 0;

        this.ListPayment.forEach((item) => {
            jumlah_pendapatan_kasir += item['jumlah_penerimaan'];
        });

        this.TotalPenerimaan = jumlah_pendapatan_kasir;
    }

    onSubmitForm(FormTutupKasir: IInsertTutupKasirSpesialModel): void {
        // let parameter: IInsertTutupKasirModel = {
        //     keterangan_tutup_kasir: FormTutupKasir.keterangan_tutup_kasir,
        //     rekap_payment_kasir: this.ListPayment,
        // };

        let parameter: IInsertTutupKasirSpesialModel = {
            keterangan_tutup_kasir: FormTutupKasir.keterangan_tutup_kasir,
            selisih: FormTutupKasir.selisih,
            kelebihan: FormTutupKasir.kelebihan,
        };

        this.settingKasirService.onPostTutupKasirSpesial(parameter)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Tutup Kasir Berhasil Disimpan')
                        .then(() => {
                            this.onResetForm();
                        });
                };
            });
    }

    onResetForm(): void {
        this.FormTutupKasir.reset();
        this.keterangan_tutup_kasir.setValue("");
        this.TotalPenerimaan = 0;
    }

    get keterangan_tutup_kasir(): AbstractControl { return this.FormTutupKasir.get('keterangan_tutup_kasir') as AbstractControl };
    get selisih(): AbstractControl { return this.FormTutupKasir.get('selisih') as AbstractControl };
    get kelebihan(): AbstractControl { return this.FormTutupKasir.get('kelebihan') as AbstractControl };
}
