import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetDetailPendapatanKasirModel, GetHistoryModalKasirModel, GetHistoryTutupKasirModel, GetHistoryValidasiTutupKasirModel, IInsertBukaKasirModel, IInsertTambahModalKasirModel, IInsertTutupKasirModel, IValidasiTutupKasirModel } from 'src/app/model/setting-kasir.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

export interface PaymentMethod {
    id_payment_method: number;
    payment_method: string
}

@Injectable({
    providedIn: 'root'
})
export class SettingKasirService {

    API = API_CONFIG.API.SETTING_KASIR;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetPaymentMethod(): PaymentMethod[] {
        return [
            { id_payment_method: 1, payment_method: 'CASH' },
            { id_payment_method: 2, payment_method: 'QR' },
            { id_payment_method: 3, payment_method: 'DEBIT CARD' },
            { id_payment_method: 4, payment_method: 'CREDIT CARD' },
            { id_payment_method: 5, payment_method: 'VOUCHER' },
        ]
    }

    // ** BUKA KASIR
    onGetRiwayatBukaKasir(): Observable<GetHistoryModalKasirModel> {
        return this.httpRequestService.defaultGetRequest(this.API.BUKA_KASIR_HISTORY);
    }

    onPostBukaKasir(body: IInsertBukaKasirModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.BUKA_KASIR_INSERT, body);
    }

    onPostTambahModal(body: IInsertTambahModalKasirModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.BUKA_KASIR_TAMBAH_MODAL, body);
    }

    // ** TUTUP KASIR
    onGetRiwayatTutupKasir(): Observable<GetHistoryTutupKasirModel> {
        return this.httpRequestService.defaultGetRequest(this.API.TUTUP_KASIR_HISTORY);
    }

    onPostTutupKasir(body: IInsertTutupKasirModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.TUTUP_KASIR_INSERT, body);
    }

    onPostCancelTutupKasir(id_saldo_kasir: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(`${this.API.TUTUP_KASIR_CANCEL}${id_saldo_kasir}`, []);
    }

    // ** VALIDASI TUTUP KASIR
    onGetPendapatanVersiKasir(id_saldo_kasir: number): Observable<GetDetailPendapatanKasirModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.VALIDASI_GET_PENDAPATAN_BY_KASIR}${id_saldo_kasir}`);
    }

    onGetPendapatanVersiSystem(id_saldo_kasir: number): Observable<GetDetailPendapatanKasirModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.VALIDASI_GET_PENDAPATAN_BY_SYSTEM}${id_saldo_kasir}`);
    }

    onPostValidasiTutupKasir(body: IValidasiTutupKasirModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.VALIDASI_INSERT, body);
    }

    onGetRiwayatValidasiTutupKasir(body: any): Observable<GetHistoryValidasiTutupKasirModel> {
        return this.httpRequestService.defaultPostRequest(this.API.VALIDASI_HISTORY, body);
    }
}
