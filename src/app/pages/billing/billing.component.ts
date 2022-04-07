import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { DetailResepBillingModel, IDataBilingModel, IInsertBillingModel, IPasienForBillingModel, PaymentDetail } from 'src/app/model/billing.model';
import { ISetupMarketingModel } from 'src/app/model/setup-marketing.model';
import { BillingService } from 'src/app/services/billing/billing.service';
import { SetupMarketingService } from 'src/app/services/setup-marketing/setup-marketing.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as API_CONFIG from '../../api';
import { CashComponent } from './payment-method/cash/cash.component';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    API = API_CONFIG.API;

    @ViewChild('TabRef', { static: true }) TabRef!: TabComponent;

    @ViewChild('FilterDialogPasien') FilterDialogPasien!: FilterDialogComponent;
    FilterDialogProp!: FilterDialogProp;

    @ViewChild('DropdownMarketing') DropdownMarketing!: DropDownListComponent;
    DropdownMarketingDatasource: ISetupMarketingModel[] = [];
    DropdownMarketingField: Object = { text: 'nama_marketing', value: 'id_marketing' };

    DetailDatasource: any;
    FormTransHeader!: FormGroup;
    SelectedDataBilling!: IDataBilingModel;
    Total: number = 0;
    Voucher: number = 0;
    GrandTotal: number = 0;

    PaymentDetailState: 'cash' | 'qris' | 'debit_card' | 'credit_card' = 'cash';

    @ViewChild('CashComp') CashComp!: CashComponent;
    @ViewChild('QRComp') QRComp!: CashComponent;
    @ViewChild('DebitCardComp') DebitCardComp!: CashComponent;
    @ViewChild('CreditCardComp') CreditCardComp!: CashComponent;

    ListPayment: PaymentDetail[] = [];

    KurangBayar: number = 0;
    TotalBayar: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private billingService: BillingService,
        private setupMarketingService: SetupMarketingService,
    ) { }

    ngOnInit(): void {
        this.FormTransHeader = this.formBuilder.group({
            id_register: [0, []],
            total_amount: [0, []],
            id_marketing: [0, []]
        });

        this.FilterDialogProp = {
            title: 'Pencarian Pasien',
            dynamicFilter: {
                columnName: `concat(p.nama_depan, ' ',p.nama_belakang)`,
                filter: 'like',
                searchText: '',
                searchText2: ''
            },
            searchUrl: this.API.BILLING.GET_ALL_PASIEN_FOR_BILLING,
            searchResultAttribute: {
                id: 'nama_pasien',
                text: 'no_rekam_medis'
            }
        };

        this.setupMarketingService.onGetAll()
            .subscribe((result) => {
                this.DropdownMarketingDatasource = result.data;
            });
    }

    handleChooseFilterDialog(args: IPasienForBillingModel): void {
        const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;
        nama_pasien.value = args.nama_pasien;

        this.id_register.setValue(args.id_register);

        this.onGetDataBillingPasien(args.no_register);
    }

    onGetDataBillingPasien(no_register: string): void {
        this.billingService.onGetDataBillingByNoRegister(no_register)
            .subscribe((result) => {
                this.SelectedDataBilling = result.data;

                const resep = result.data.resep.detail.filter((item) => {
                    return item.status_bayar = true;
                });

                this.DetailDatasource = {
                    tdmk: result.data.tdmk.detail,
                    resep: resep
                };

                this.handleChangePaymentMethodState('cash');

                this.onCountTotalAmount(result.data.informasi_pasien, this.DetailDatasource.tdmk, this.DetailDatasource.resep);
            });
    }

    onCountTotalAmount(informasi_pasien: any, tdmk: any, resep: any): void {
        let total_amount = informasi_pasien.total_biaya;

        let total_tdmk = 0;

        tdmk.filter((item: any) => {
            total_tdmk += item.total_amount
        });

        let total_resep = 0;

        resep.filter((item: any) => {
            if (item.status_bayar) {
                total_resep += item.total_amount
            }
        });

        total_amount = total_tdmk + total_resep;

        this.total_amount.setValue(total_amount);
        this.GrandTotal = this.total_amount.value;
        this.KurangBayar = this.total_amount.value;

        let total_payment = 0;

        if (this.ListPayment.length) {
            this.ListPayment.filter((item) => {
                total_payment += item.jumlah_bayar;
            });

            this.KurangBayar = this.GrandTotal - total_payment;
        }

        this.handleChangePaymentMethodState('cash');
    }

    onChangeStateDetailResep(data: DetailResepBillingModel, index: number, state: boolean): void {
        this.DetailDatasource.resep[index].status_bayar = state;

        this.onCountTotalAmount(this.SelectedDataBilling.informasi_pasien, this.DetailDatasource.tdmk, this.DetailDatasource.resep);
    }

    handleChangePaymentMethodState(state: 'cash' | 'qris' | 'debit_card' | 'credit_card'): void {
        this.PaymentDetailState = state;

        setTimeout(() => {
            switch (state) {
                case ('cash'):
                    this.CashComp.SisaKurangBayar = this.KurangBayar;
                    break;
                case ('qris'):
                    this.QRComp.SisaKurangBayar = this.KurangBayar;
                    break;
                case ('debit_card'):
                    this.DebitCardComp.SisaKurangBayar = this.KurangBayar;
                    break;
                case ('credit_card'):
                    this.CreditCardComp.SisaKurangBayar = this.KurangBayar;
                    break;
                default:
                    break;
            }
        }, 250);
    }

    onReceivePaymentMethod(FormPaymentMethod: PaymentDetail): void {
        this.ListPayment.push(FormPaymentMethod);

        this.onCountPaymentMethod(this.ListPayment);
    }

    onCountPaymentMethod(data: PaymentDetail[]): void {
        let total_bayar = 0;

        data.forEach((item) => {
            total_bayar += item.jumlah_bayar
        });

        this.TotalBayar = total_bayar;

        this.KurangBayar = this.GrandTotal - total_bayar;

        this.handleChangePaymentMethodState(this.PaymentDetailState);
    }

    onDeletePaymentMethod(index: number): void {
        this.ListPayment.splice(index, 1);
        this.onCountPaymentMethod(this.ListPayment);
    }

    onSubmitBillingPasien(): void {
        const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;

        const payment = {
            jumlah_payment: this.GrandTotal,
            keterangan: '',
            pembayar: nama_pasien.value
        };

        const body: IInsertBillingModel = {
            trans_header: this.FormTransHeader.value,
            trans_detail: this.DetailDatasource.tdmk,
            resep_detail: this.DetailDatasource.resep.filter((item: any) => { return item.status_bayar == true }),
            payment: payment,
            payment_detail: this.ListPayment,
        };

        this.billingService.onInsertInvoiceWithPayment(body)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Billing Berhasil Diproses')
                        .then(() => {
                            const btnCloseOffcanvas = document.getElementById('btnCloseOffcanvas') as HTMLInputElement;
                            btnCloseOffcanvas.click();

                            this.billingService.onPrintNotaInvoice(this.id_register.value);

                            this.onResetForm();
                        });
                }
            });
    }

    onResetForm(): void {
        const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;
        nama_pasien.value = "";
        this.id_register.setValue(0);
        this.total_amount.setValue(0);
        this.id_marketing.setValue(0);
        this.GrandTotal = 0;
        this.DetailDatasource = {};
        this.KurangBayar = 0;
        this.TotalBayar = 0;
        this.handleChangePaymentMethodState('cash');
        this.ListPayment = [];
    }

    get id_register(): AbstractControl { return this.FormTransHeader.get('id_register') as AbstractControl };
    get total_amount(): AbstractControl { return this.FormTransHeader.get('total_amount') as AbstractControl };
    get id_marketing(): AbstractControl { return this.FormTransHeader.get('id_marketing') as AbstractControl };
}
