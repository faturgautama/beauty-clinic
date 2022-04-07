import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllRoleModel, IInsertSetupRoleModel, IUpdateSetupRoleModel } from 'src/app/model/setup-role.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupRoleService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_ROLE;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllRole(): Observable<GetAllRoleModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL);
    }

    onPostSave(body: IInsertSetupRoleModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT, body);
    }

    onPutUpdate(body: IUpdateSetupRoleModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE, body);
    }
}
