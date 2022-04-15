import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseModel } from 'src/app/model/http-request.model';
import { CheckIdentitasPasienModel, GetAllJenisIdentitasModel } from 'src/app/model/pendaftaran-pasien.model';
import { GetAllDokterByDynamicFilterModel, ISetupDokterModel, IUpdateDokterModel } from 'src/app/model/setup-dokter.model';
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

    onUploadFotoPasien(data: FormData): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultUploadFileRequest(this.API.UPLOAD_FOTO_DOKTER, data);
    }

    onGetLinkFotoPerson(id_person: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_LINK_FOTO_DOKTER + id_person, [], false);
    }

    onGetDetailDokter(id_person: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_DETAIL_DOKTER + id_person, [], false);
    }

    onPutUpdateDokter(body: IUpdateDokterModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE_DETAIL_DOKTER, body);
    }

    onPutUpdateStatusActiveDokter(id_dokter: number, is_active: boolean): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE_STATUS_ACTIVE_DOKTER, {
            id_dokter: id_dokter,
            is_active: !is_active
        });
    }
}
