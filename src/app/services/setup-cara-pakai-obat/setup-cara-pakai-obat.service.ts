import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllSetupCaraPakaiObatModel } from 'src/app/model/setup-cara-pakai-obat.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupCaraPakaiObatService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_CARA_PAKAI_OBAT;

    constructor(
        private httpRequestService: HttpRequestService
    ) { }

    onGetAllByDynamicFilter(body: any): Observable<GetAllSetupCaraPakaiObatModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_BY_DYNAMIC_FILTER, body);
    }

    onGetAll(): Observable<GetAllSetupCaraPakaiObatModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL);
    }
}
