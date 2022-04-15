import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllVoucherByDynamicFilterModel, GetVoucherByIdModel, IInsertSetupVoucherModel, IUpdateSetupVoucherModel } from 'src/app/model/setup-voucher.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupVoucherService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_VOUCHER;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllByDynamicFilter(body: any): Observable<GetAllVoucherByDynamicFilterModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_TARIF_DYNAMIC_FILTER, body);
    }

    onGetById(id_voucher: number): Observable<GetVoucherByIdModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_BY_ID}${id_voucher}`);
    }

    onPostSave(body: IInsertSetupVoucherModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.POST_SAVE, body);
    }

    onPutUpdate(body: IUpdateSetupVoucherModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.PUT_UPDATE, body);
    }

    onPutUpdateStatusActive(id_voucher: number, is_active: boolean): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.POST_UPDATE_STATUS, {
            id_voucher: id_voucher,
            is_active: !is_active
        });
    }

    onDelete(id_voucher: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultDeleteRequest(`${this.API.DELETE}${id_voucher}`);
    }
}
