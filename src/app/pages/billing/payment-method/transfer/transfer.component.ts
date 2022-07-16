import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BillingService } from 'src/app/services/billing/billing.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

    SisaKurangBayar = 0;

    FormPaymentMethod!: FormGroup;

    DropdownBankDatasource: any = [];
    DropdownBankField = { text: 'nama_bank_payment', value: 'id_bank_payment' };

    @Output('onSendPaymentTransfer') onSendPaymentTransfer = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder,
        private billingService: BillingService,
    ) {
        this.FormPaymentMethod = this.formBuilder.group({
            id_payment_method: [6, []],
            payment_method: ['TRANSFER'],
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
        this.billingService.onGetBankPayment()
            .subscribe((result) => {
                this.DropdownBankDatasource = result.data;
            });
    }

    onSubmitPayment(FormPaymentMethod: any): void {
        if (this.SisaKurangBayar > 0) {
            this.onSendPaymentTransfer.emit(FormPaymentMethod);
            this.onResetForm();
        }
    }

    onResetForm(): void {
        this.id_bank_payment.setValue(0);
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
