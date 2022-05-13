import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { DetailPelaksanaTreatmentModel, GetAllTreatmenByIdRegisterModel, ICancelTreatmentModel, IInsertTreatmentModel } from 'src/app/model/treatment.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class TreatmentService {

    API = API_CONFIG.API.TREATMENT;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetById(id_register: number): Observable<GetAllTreatmenByIdRegisterModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_HISTORY}${id_register}`);
    }

    onPostSave(body: IInsertTreatmentModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT, body);
    }

    onCancel(body: ICancelTreatmentModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.CANCEL, body);
    }

    onGetHistory(id_register: number): Observable<GetAllTreatmenByIdRegisterModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_HISTORY}${id_register}`);
    }

    onPostUpdateBC(body: DetailPelaksanaTreatmentModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.UPDATE_BC, body);
    }

    onPostSaveWithResep(id_register: number, item_transaksi: any[], item_resep: any[]): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT_WITH_RESEP, {
            id_register: id_register,
            item_transaksi: item_transaksi,
            item_resep: item_resep
        });
    }
}
