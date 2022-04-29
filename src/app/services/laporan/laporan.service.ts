import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailFeeBc, DetailFeeDokter, DetailOmsetObatModel, DetailOmsetTreatmentModel, DetailPendapatanModel, SummaryFeeBc, SummaryFeeDokter, SummaryOmsetObatModel, SummaryOmsetTreatmentModel, SummaryPendapatanModel } from 'src/app/model/laporan.model';
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

    onGetSummaryPendapatan(tanggal_mulai: Date, tanggal_selesai: Date): Observable<SummaryPendapatanModel> {
        return this.httpRequestService.defaultPostRequest(this.API.SUMMARY_PENDAPATAN, { tanggal_mulai: tanggal_mulai, tanggal_selesai: tanggal_selesai });
    }

    onGetDetailPendapatan(body: any): Observable<DetailPendapatanModel> {
        return this.httpRequestService.defaultPostRequest(this.API.DETAIL_PENDAPATAN, body);
    }

    onGetSummaryFeeDokter(tanggal_mulai: Date, tanggal_selesai: Date): Observable<SummaryFeeDokter> {
        return this.httpRequestService.defaultPostRequest(this.API.SUMMARY_FEE_DOKTER, { tanggal_mulai: tanggal_mulai, tanggal_selesai: tanggal_selesai });
    }

    onGetDetailFeeDokter(id_dokter: number, tanggal_mulai: Date, tanggal_selesai: Date): Observable<DetailFeeDokter> {
        return this.httpRequestService.defaultPostRequest(this.API.DETAIL_FEE_DOKTER, {
            id_dokter: id_dokter,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai
        });
    }

    onGetSummaryFeeBc(tanggal_mulai: Date, tanggal_selesai: Date): Observable<SummaryFeeBc> {
        return this.httpRequestService.defaultPostRequest(this.API.SUMMARY_FEE_BC, { tanggal_mulai: tanggal_mulai, tanggal_selesai: tanggal_selesai });
    }

    onGetDetailFeeBc(id_user: number, tanggal_mulai: Date, tanggal_selesai: Date): Observable<DetailFeeBc> {
        return this.httpRequestService.defaultPostRequest(this.API.DETAIL_FEE_BC, {
            id_user: id_user,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai
        });
    }
}
