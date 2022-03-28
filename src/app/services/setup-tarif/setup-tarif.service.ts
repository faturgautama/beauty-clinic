import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllTarifByDynamicFilterModel, GetTarifByIdModel, IInsertSetupTarifModel, IUpdateSetupTarifModel } from 'src/app/model/setup-tarif.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupTarifService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_TARIF;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllByDynamicFilter(body: any): Observable<GetAllTarifByDynamicFilterModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_TARIF_DYNAMIC_FILTER, body);
    }

    onGetById(id_setup_tarif: number): Observable<GetTarifByIdModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_TARIF_BY_ID}${id_setup_tarif}`);
    }

    onPostSave(body: IInsertSetupTarifModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.POST_SAVE_TARIF, body);
    }

    onPutUpdate(body: IUpdateSetupTarifModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.PUT_UPDATE_TARIF, body);
    }

    onPutUpdateStatusActive(id_setup_tarif: number, is_active: boolean): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.PUT_UPDATE_STATUS_TARIF, {
            id_setup_tarif: id_setup_tarif,
            is_active: !is_active
        });
    }
}
