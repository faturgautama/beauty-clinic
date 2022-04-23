import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailOmsetObatModel, DetailOmsetTreatmentModel, SummaryOmsetObatModel, SummaryOmsetTreatmentModel } from 'src/app/model/laporan.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class LaporanService {

    API = API_CONFIG.API.LAPORAN;

    constructor(
        private httpRequestService: HttpRequestService,
    ) { }

    onGetSummaryOmsetTreatment(body: any): Observable<SummaryOmsetTreatmentModel> {
        return this.httpRequestService.defaultPostRequest(this.API.SUMMARY_OMSET_TREATMENT, body);
    }

    onGetDetailOmsetTreatment(body: any): Observable<DetailOmsetTreatmentModel> {
        return this.httpRequestService.defaultPostRequest(this.API.DETAIL_OMSET_TREATMENT, body);
    }

    onGetSummaryOmsetObat(body: any): Observable<SummaryOmsetObatModel> {
        return this.httpRequestService.defaultPostRequest(this.API.SUMMARY_OMSET_OBAT, body);
    }

    onGetDetailOmsetObat(body: any): Observable<DetailOmsetObatModel> {
        return this.httpRequestService.defaultPostRequest(this.API.DETAIL_OMSET_OBAT, body);
    }
}
