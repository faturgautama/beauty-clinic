import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { GetAllResepByIdRegisterModel, ICancelResepModel, IInsertResepModel } from 'src/app/model/resep.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class ResepService {

    API = API_CONFIG.API.RESEP;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetById(id_register: number): Observable<GetAllResepByIdRegisterModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.GET_HISTORY}${id_register}`);
    }

    onPostSave(body: IInsertResepModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.INSERT, body);
    }

    onCancel(body: ICancelResepModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.CANCEL, body);
    }
}
