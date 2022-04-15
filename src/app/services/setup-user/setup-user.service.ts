import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponseModel } from 'src/app/model/authentication.model';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllUserModel, IInsertSetupUserModel, IUpdateSetupUserModel } from 'src/app/model/setup-user.model';
import * as API_CONFIG from '../../api';
import { AuthenticationService } from '../authentication/authentication.service';
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

    onGetAllUserActive(): Observable<GetAllUserModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL_USER_ACTIVE);
    }

    onPostSave(body: IInsertSetupUserModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT, body);
    }

    onPutUpdate(body: IUpdateSetupUserModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE, body);
    }

    onPutUpdateActivated(id_user: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequestWithoutParams(`${this.API.ACTIVATED}${id_user}`);
    }

    onPutUpdateDeactivated(id_user: number): Observable<HttpResponseModel> {
        const userData: ILoginResponseModel = JSON.parse(localStorage.getItem('UserData') as any);

        return this.httpRequestService.defaultPutRequest(this.API.DEACTIVATED, {
            id_user: id_user,
            user_deactived: userData.id_user
        });
    }
}
