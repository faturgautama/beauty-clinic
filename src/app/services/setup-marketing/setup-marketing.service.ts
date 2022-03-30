import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllSetupMarketingModel, GetByIdSetupMarketingModel, IInsertSetupMarketingModel, IUpdateSetupMarketingModel } from 'src/app/model/setup-marketing.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupMarketingService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_MARKETING;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllByDynamicFilter(body: any): Observable<GetAllSetupMarketingModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_BY_DYNAMIC_FILTER, body);
    }

    onGetAll(body: any): Observable<GetAllSetupMarketingModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL, body);
    }

    onGetById(id_marketing: number): Observable<GetByIdSetupMarketingModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_BY_ID}${id_marketing}`);
    }

    onPostSave(body: IInsertSetupMarketingModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT, body);
    }

    onPutUpdate(body: IUpdateSetupMarketingModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE, body);
    }

    onPutUpdateStatusActive(id_marketing: number, is_active: boolean): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE_STATUS, {
            id_marketing: id_marketing,
            is_active: !is_active
        });
    }

    onDelete(id_marketing: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultDeleteRequest(`${this.API.DELETE}${id_marketing}`);
    }
}
