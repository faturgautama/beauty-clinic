import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllUserModel, IInsertSetupUserModel, IUpdateSetupUserModel } from 'src/app/model/setup-user.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupUserService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_USER;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllUserKasir(): Observable<GetAllUserModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_USER_KASIR);
    }

    onGetAllUserByDynamicFilter(body: any): Observable<GetAllUserModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_USER_DYNAMIC_FILTER, body);
    }

    onGetAllUser(): Observable<GetAllUserModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL_USER);
    }

    onPostSave(body: IInsertSetupUserModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT, body);
    }

    onPutUpdate(body: IUpdateSetupUserModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE, body);
    }
}
