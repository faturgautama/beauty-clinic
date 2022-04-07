import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { BillingService } from 'src/app/services/billing/billing.service';

@Component({
    selector: 'app-credit-card',
    templateUrl: './credit-card.component.html',
    styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

    SisaKurangBayar = 0;

    FormPaymentMethod!: FormGroup;

    DropdownEdcDatasource: any = [];
    DropdownEdcField = { text: 'nama_edc_payment', value: 'id_edc_payment' };

    DropdownBankDatasource: any = [];
    DropdownBankField = { text: 'nama_bank_payment', value: 'id_bank_payment' };

    @Output('onSendPaymentCreditCard') onSendPaymentCreditCard = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder,
        private billingService: BillingService,
    ) {
        this.FormPaymentMethod = this.formBuilder.group({
            id_payment_method: [4, []],
            payment_method: ['CREDIT CARD'],
            id_payment_method_detail: [0, []],
            jumlah_bayar: [0, []],
            id_voucher: [0, []],
            id_bank_payment: [0, []],
            id_edc_payment: [0, []],
            trace_number: ["", []],
            jenis_kartu: ["", []],
            card_holder: ["", []],
            nomor_kartu: ["", []],
        });
    }

    ngOnInit(): void {
        this.billingService.onGetEdcPayment()
            .subscribe((result) => {
                this.DropdownEdcDatasource = result.data;
            });

        this.billingService.onGetBankPayment()
            .subscribe((result) => {
                this.DropdownBankDatasource = result.data;
            });
    }

    onSubmitPayment(FormPaymentMethod: any): void {
        if (this.SisaKurangBayar > 0) {
            this.onSendPaymentCreditCard.emit(FormPaymentMethod);
            this.onResetForm();
        }
    }

    onResetForm(): void {
        this.id_bank_payment.setValue(0);
        this.id_edc_payment.setValue(0);
        this.trace_number.setValue("");
        this.jenis_kartu.setValue("");
        this.nomor_kartu.setValue("");
        this.card_holder.setValue("");
        this.jumlah_bayar.setValue(0);
    }

    get id_payment_method(): AbstractControl { return this.FormPaymentMethod.get('id_payment_method') as AbstractControl }
    get id_payment_method_detail(): AbstractControl { return this.FormPaymentMethod.get('id_payment_method_detail') as AbstractControl }
    get jumlah_bayar(): AbstractControl { return this.FormPaymentMethod.get('jumlah_bayar') as AbstractControl }
    get id_voucher(): AbstractControl { return this.FormPaymentMethod.get('id_voucher') as AbstractControl }
    get id_bank_payment(): AbstractControl { return this.FormPaymentMethod.get('id_bank_payment') as AbstractControl }
    get id_edc_payment(): AbstractControl { return this.FormPaymentMethod.get('id_edc_payment') as AbstractControl }
    get trace_number(): AbstractControl { return this.FormPaymentMethod.get('trace_number') as AbstractControl }
    get jenis_kartu(): AbstractControl { return this.FormPaymentMethod.get('jenis_kartu') as AbstractControl }
    get card_holder(): AbstractControl { return this.FormPaymentMethod.get('card_holder') as AbstractControl }
    get nomor_kartu(): AbstractControl { return this.FormPaymentMethod.get('nomor_kartu') as AbstractControl }

}
