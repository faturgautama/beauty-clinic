import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { CheckIdentitasPasienModel, GetAllJenisIdentitasModel } from 'src/app/model/pendaftaran-pasien.model';
import { GetAllDokterByDynamicFilterModel, ISetupDokterModel } from 'src/app/model/setup-dokter.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class SetupDokterService {

    API = API_CONFIG.API.SETUP_DATA.API.SETUP_DOKTER;

    constructor(
        private utilityService: UtilityService,
        private httpRequestService: HttpRequestService,
    ) { }

    onGetAllPersonDokter(): Observable<GetAllDokterByDynamicFilterModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL_PERSON_DOKTER);
    }

    onGetAllPersonDokterByDynamicFilter(body: any): Observable<GetAllDokterByDynamicFilterModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_PERSON_DOKTER_DYNAMIC_FILTER, body);
    }

    onGetAllJenisIdentitas(): Observable<GetAllJenisIdentitasModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL_JENIS_IDENTITAS);
    }

    onCheckIdentitasDokter(no_identitas: string): Observable<CheckIdentitasPasienModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.CHECK_IDENTITAS_DOKTER}${no_identitas}`);
    }

    onSaveSetupDokter(body: ISetupDokterModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.SAVE_PENDAFTARAN_DOKTER, body);
    }
}
