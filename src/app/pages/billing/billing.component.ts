import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDialogComponent, FilterDialogProp } from 'src/app/components/navigation/filter-dialog/filter-dialog.component';
import { TabComponent } from 'src/app/components/navigation/tab/tab.component';
import { DetailResepBillingModel, DetailTindakanBillingModel, IDataBilingModel, IInsertBillingModel, IPasienForBillingModel, PaymentDetail } from 'src/app/model/billing.model';
import { ISetupMarketingModel } from 'src/app/model/setup-marketing.model';
import { ISetupVoucherModel } from 'src/app/model/setup-voucher.model';
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

    @ViewChild('FilterDialogVoucher') FilterDialogVoucher!: FilterDialogComponent;
    FilterVoucherDialogProp!: FilterDialogProp;
    SelectedDataVoucher!: ISetupVoucherModel;

    @ViewChild('DropdownMarketing') DropdownMarketing!: DropDownListComponent;
    DropdownMarketingDatasource: ISetupMarketingModel[] = [];
    DropdownMarketingField: Object = { text: 'nama_marketing', value: 'id_marketing' };

    DetailDatasource: any;
    FormTransHeader!: FormGroup;
    SelectedDataBilling!: IDataBilingModel;
    Total: number = 0;
    Diskon: number = 0;
    Voucher: number = 0;
    Total2: number = 0;
    PPn: number = 0;
    ServicesTaxes: number = 0;
    GrandTotal: number = 0;

    PaymentDetailState: 'cash' | 'qris' | 'debit_card' | 'credit_card' = 'cash';

    @ViewChild('CashComp') CashComp!: CashComponent;
    @ViewChild('QRComp') QRComp!: CashComponent;
    @ViewChild('DebitCardComp') DebitCardComp!: CashComponent;
    @ViewChild('CreditCardComp') CreditCardComp!: CashComponent;

    ListPayment: PaymentDetail[] = [];

    KurangBayar: number = 0;
    TotalBayar: number = 0;

    SelectedDetailTreatment!: DetailTindakanBillingModel;
    SelectedDetailTreatmentIndex = 0;

    modalRef?: BsModalRef;

    @ViewChild('ModalUpdateDetailTreatment') ModalUpdateDetailTreatment!: TemplateRef<any>;

    FormUpdateDetailTreatment!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private billingService: BillingService,
        private setupMarketingService: SetupMarketingService,
    ) { }

    ngOnInit(): void {
        this.FormTransHeader = this.formBuilder.group({
            id_register: [0, []],
            total_amount: [0, []],
            id_marketing: [0, []],
            id_voucher: [0, []],
            applied_ppn_procentage: [11, []],
            applied_ppn_nominal: [0, []],
            // applied_service_fee_procentage: [5, []],
            // applied_service_fee_nominal: [0, []],
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

        this.FilterVoucherDialogProp = {
            title: 'Pencarian Voucher',
            dynamicFilter: {
                columnName: `sv.nama`,
                filter: 'like',
                searchText: '',
                searchText2: ''
            },
            searchUrl: this.API.SETUP_DATA.API.SETUP_VOUCHER.GET_ALL_TARIF_DYNAMIC_FILTER,
            searchResultAttribute: {
                id: 'nama',
                text: 'nominal_voucher'
            }
        };

        this.setupMarketingService.onGetAll()
            .subscribe((result) => {
                this.DropdownMarketingDatasource = result.data;
            });

        this.FormUpdateDetailTreatment = this.formBuilder.group({
            id_transaksi: [0, []],
            kode_setup_tarif: ["", []],
            nama_setup_tarif: ["", []],
            qty: [0, []],
            status_bayar: [true, []],
            tgl_order: ["", []],
            total_amount_treatment: [0, []],
            total_amount: [0, []],
            total_bayar: [0, []],
            unit_amount: [0, []],
            diskon_nominal: [0, []],
        });
    }

    handleChooseFilterDialog(args: IPasienForBillingModel): void {
        const nama_pasien = document.getElementById('nama_pasien') as HTMLInputElement;
        nama_pasien.value = args.nama_pasien;

        this.id_register.setValue(args.id_register);

        this.onGetDataBillingPasien(args.no_register);
    }

    handleChooseFilterVoucherDialog(args: ISetupVoucherModel): void {
        this.id_voucher.setValue(args.id_voucher);

        const nilai = args.nominal_voucher == 0 ? args.nominal_voucher : args.prosentase_voucher;

        const nama_voucher = document.getElementById('nama_voucher') as HTMLInputElement;
        nama_voucher.value = `${args.nama} (${nilai})`

        this.SelectedDataVoucher = args;

        this.onCountTotalAmount(this.SelectedDataBilling.informasi_pasien, this.DetailDatasource.tdmk, this.DetailDatasource.resep);
    }

    onGetDataBillingPasien(no_register: string): void {
        this.billingService.onGetDataBillingByNoRegister(no_register)
            .subscribe((result) => {
                this.SelectedDataBilling = result.data;

                const tdmk = result.data.tdmk.detail.map((item) => ({
                    ...item,
                    status_bayar: true,
                    total_amount_treatment: item.total_amount,
                    diskon_nominal: 0,
                }));

                const resep = result.data.resep.detail.map((item) => ({
                    ...item,
                    status_bayar: true,
                }));

                this.DetailDatasource = {
                    tdmk: tdmk,
                    resep: resep
                };

                this.handleChangePaymentMethodState('cash');

                this.onCountTotalAmount(result.data.informasi_pasien, this.DetailDatasource.tdmk, this.DetailDatasource.resep);
            });
    }

    onCountTotalAmount(informasi_pasien: any, tdmk: any, resep: any): void {
        let total_amount = informasi_pasien.total_biaya;

        // ** Set Value for Total 1
        this.Total = total_amount;

        // !! Revisi tgl 19 April 2022
        // this.total_amount.setValue(total_tdmk + total_resep);

        // ** Set Value for Diskon and Total TDMK
        let total_tdmk = 0;
        this.Diskon = 0;
        tdmk.filter((item: any) => {
            if (item.status_bayar) {
                total_tdmk += (item.total_amount - item.diskon_nominal);
                this.Diskon += item.diskon_nominal;
            }
        });

        // ** Set Value for Total Resep
        let total_resep = 0;
        resep.filter((item: any) => {
            if (item.status_bayar) {
                total_resep += item.total_amount
            }
        });

        // ** Set Value for Total Amount
        let total_amount_after_discount = total_tdmk + total_resep;

        // !! Revisi tgl 19 April => total_tdmk hanya menghitung treatment yg ada
        // !! Treatment yg dihapus gak perlu dihitung lagi
        this.total_amount.setValue(total_tdmk + total_resep);

        // ** Set Value for Total 2
        this.Total2 = 0;
        this.Total2 = total_amount_after_discount;

        // ** Check if Data Voucher exist
        if (this.SelectedDataVoucher) {
            if (this.SelectedDataVoucher.nominal_voucher > 0 && this.SelectedDataVoucher.prosentase_voucher == 0) {
                this.Total2 = this.Total2 - this.SelectedDataVoucher.nominal_voucher;
            };

            if (this.SelectedDataVoucher.prosentase_voucher > 0 && this.SelectedDataVoucher.nominal_voucher == 0) {
                this.Total2 = this.Total2 - (this.Total2 * (this.SelectedDataVoucher.prosentase_voucher / 100));
            };
        }

        this.PPn = this.Total2 * (11 / 100);
        this.applied_ppn_nominal.setValue(this.PPn);

        // this.ServicesTaxes = this.Total2 * (5 / 100);
        // this.applied_service_fee_nominal.setValue(this.ServicesTaxes);

        this.GrandTotal = this.Total2 + this.PPn; //+ this.ServicesTaxes;
        this.KurangBayar = this.GrandTotal;

        // ** Set Value for Total Payment and Kurang Bayar
        let total_payment = 0;
        if (this.ListPayment.length) {
            this.ListPayment.filter((item) => {
                total_payment += item.jumlah_bayar;
            });

            this.KurangBayar = this.GrandTotal - total_payment;
        }

        // ** Trigger Change Payment Method Component
        this.handleChangePaymentMethodState('cash');
    }

    onEditDetailTreatment(data: DetailTindakanBillingModel, index: number): void {
        this.SelectedDetailTreatment = data;
        this.SelectedDetailTreatmentIndex = index;

        this.modalRef = this.bsModalService.show(this.ModalUpdateDetailTreatment, {
            backdrop: 'static',
        });

        this.FormUpdateDetailTreatment.setValue(data);
    }

    handleChangeDiskonNominalTreatment(args: any): void {
        if (args.value > 0) {
            this.total_amount_treatment.setValue(this.total_amount_treatment.value - this.diskon_nominal.value);
        } else {
            this.total_amount_treatment.setValue(this.total_amount_treatment.value + args.previousValue);
        }
    }

    onUpdateDetailTreatment(data: DetailTindakanBillingModel): void {
        this.DetailDatasource.tdmk[this.SelectedDetailTreatmentIndex] = data;

        this.modalRef?.hide();

        this.Diskon += data.diskon_nominal as any;

        this.onCountTotalAmount(this.SelectedDataBilling.informasi_pasien, this.DetailDatasource.tdmk, this.DetailDatasource.resep);
    }

    onChangeStateDetailTreatment(data: DetailTindakanBillingModel, index: number, state: boolean): void {
        this.DetailDatasource.tdmk[index].status_bayar = state;

        console.log(this.DetailDatasource);

        this.onCountTotalAmount(this.SelectedDataBilling.informasi_pasien, this.DetailDatasource.tdmk, this.DetailDatasource.resep);
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
            trans_detail: this.DetailDatasource.tdmk.filter((item: any) => { return item.status_bayar == true }),
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
        const nama_voucher = document.getElementById('nama_voucher') as HTMLInputElement;
        nama_voucher.value = "";
        this.id_register.setValue(0);
        this.total_amount.setValue(0);
        this.id_marketing.setValue(0);
        this.id_voucher.setValue(0);
        // this.applied_ppn_nominal.setValue(0);
        // this.applied_service_fee_nominal.setValue(0);
        this.Total = 0;
        this.Diskon = 0;
        this.SelectedDataVoucher = {} as any;
        this.Total2 = 0;
        this.PPn = 0;
        this.ServicesTaxes = 0;
        this.GrandTotal = 0;
        this.DetailDatasource = {};
        this.KurangBayar = 0;
        this.TotalBayar = 0;
        this.handleChangePaymentMethodState('cash');
        this.ListPayment = [];

        this.FilterDialogPasien.onResetResult();

        this.FilterDialogVoucher.onResetResult();
    }

    get id_register(): AbstractControl { return this.FormTransHeader.get('id_register') as AbstractControl };
    get total_amount(): AbstractControl { return this.FormTransHeader.get('total_amount') as AbstractControl };
    get id_marketing(): AbstractControl { return this.FormTransHeader.get('id_marketing') as AbstractControl };
    get id_voucher(): AbstractControl { return this.FormTransHeader.get('id_voucher') as AbstractControl };
    get applied_ppn_procentage(): AbstractControl { return this.FormTransHeader.get('applied_ppn_procentage') as AbstractControl };
    get applied_ppn_nominal(): AbstractControl { return this.FormTransHeader.get('applied_ppn_nominal') as AbstractControl };
    // get applied_service_fee_procentage(): AbstractControl { return this.FormTransHeader.get('applied_service_fee_procentage') as AbstractControl };
    // get applied_service_fee_nominal(): AbstractControl { return this.FormTransHeader.get('applied_service_fee_nominal') as AbstractControl };

    get id_transaksi(): AbstractControl { return this.FormUpdateDetailTreatment.get('id_transaksi') as AbstractControl };
    get kode_setup_tarif(): AbstractControl { return this.FormUpdateDetailTreatment.get('kode_setup_tarif') as AbstractControl };
    get nama_setup_tarif(): AbstractControl { return this.FormUpdateDetailTreatment.get('nama_setup_tarif') as AbstractControl };
    get qty(): AbstractControl { return this.FormUpdateDetailTreatment.get('qty') as AbstractControl };
    get status_bayar(): AbstractControl { return this.FormUpdateDetailTreatment.get('status_bayar') as AbstractControl };
    get tgl_order(): AbstractControl { return this.FormUpdateDetailTreatment.get('tgl_order') as AbstractControl };
    get total_amount_treatment(): AbstractControl { return this.FormUpdateDetailTreatment.get('total_amount_treatment') as AbstractControl };
    get unit_amount(): AbstractControl { return this.FormUpdateDetailTreatment.get('unit_amount') as AbstractControl };
    get diskon_nominal(): AbstractControl { return this.FormUpdateDetailTreatment.get('diskon_nominal') as AbstractControl };
}
