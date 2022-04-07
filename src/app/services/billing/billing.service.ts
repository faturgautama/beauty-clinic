import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDataBillingModel, IInsertBillingModel } from 'src/app/model/billing.model';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    API = API_CONFIG.API.BILLING;

    constructor(
        private httpRequestService: HttpRequestService,
    ) { }

    onGetEdcPayment(): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_EDC_PAYMENT);
    }

    onGetBankPayment(): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_BANK_PAYMENT);
    }

    onGetDataBillingByNoRegister(no_register: string): Observable<GetDataBillingModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_DATA_BILLING_BY_NO_REG}${no_register}`);
    }

    onInsertInvoiceWithPayment(body: IInsertBillingModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT_INVOICE_WITH_PAYMENT, body);
    }

    onPrintNotaInvoice(id_register: number): void {
        this.httpRequestService.defaultGetPrintRequest(this.API.CETAK_NOTA_BY_ID_REGISTER, { id_register: id_register })
    }
}
