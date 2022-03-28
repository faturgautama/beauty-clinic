import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllObatByDynamicFilterModel, IInsertSetupObatModel, IUpdateSetupObatModel } from 'src/app/model/setup-obat.model';
import { GetTarifByIdModel } from 'src/app/model/setup-tarif.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupObatService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_OBAT;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllByDynamicFilter(body: any): Observable<GetAllObatByDynamicFilterModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_TARIF_DYNAMIC_FILTER, body);
    }

    onGetById(id_setup_tarif: number): Observable<GetTarifByIdModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_OBAT_BY_ID}${id_setup_tarif}`);
    }

    onPostSave(body: IInsertSetupObatModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.POST_SAVE_OBAT, body);
    }

    onPutUpdate(body: IUpdateSetupObatModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.PUT_UPDATE_OBAT, body);
    }

    onPutUpdateStatusActive(id_obat: number, is_active: boolean): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.PUT_UPDATE_STATUS_OBAT, {
            id_obat: id_obat,
            is_active: !is_active
        });
    }

    onDelete(id_obat: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultDeleteRequest(`${this.API.DELETE_OBAT}${id_obat}`);
    }
}
