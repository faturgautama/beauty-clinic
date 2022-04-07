import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { UtilityService } from '../utility/utility.service';
import * as API_CONFIG from '../../api';
import { Observable } from 'rxjs';
import { CheckIdentitasPasienModel, GetAllJenisIdentitasModel, GetAllPasienByDynamicFilterModel, IPendaftaranPasienBaruModel, IUpdatePasienModel } from 'src/app/model/pendaftaran-pasien.model';
import { HttpResponseModel } from 'src/app/model/http-request.model';

@Injectable({
    providedIn: 'root'
})
export class PendaftaranPasienService {

    API = API_CONFIG.API.PENDAFTARAN_PASIEN;

    constructor(
        private utilityService: UtilityService,
        private httpRequestService: HttpRequestService,
    ) { }

    onGetAllPersonPasienByDynamicFilter(body: any): Observable<GetAllPasienByDynamicFilterModel> {
        return this.httpRequestService.defaultPostRequest(this.API.GET_ALL_PERSON_PASIEN_DYNAMIC_FILTER, body);
    }

    onGetAllJenisIdentitas(): Observable<GetAllJenisIdentitasModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_ALL_JENIS_IDENTITAS);
    }

    onCheckIdentitasPasien(no_identitas: string): Observable<CheckIdentitasPasienModel> {
        return this.httpRequestService.defaultGetRequest(`${this.API.CHECK_IDENTITAS_PASIEN}${no_identitas}`);
    }

    onSavePendaftaranPasienBaru(body: IPendaftaranPasienBaruModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPostRequest(this.API.SAVE_PENDAFTARAN_PASIEN, body);
    }

    onPutUpdatePasien(body: IUpdatePasienModel): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultPutRequest(this.API.UPDATE_PASIEN, body);
    }

    onUploadFotoPasien(data: FormData): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultUploadFileRequest(this.API.UPLOAD_FOTO_PASIEN, data);
    }

    onGetLinkFotoPerson(id_person: number): Observable<HttpResponseModel> {
        return this.httpRequestService.defaultGetRequest(this.API.GET_LINK_FOTO_PASIEN + id_person, [], false);
    }
}
