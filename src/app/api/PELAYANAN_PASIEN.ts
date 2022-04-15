import { environment } from "src/environments/environment";

export const SAVE_ADMISI = `${environment.webApi}/admisi/Admisi/AdmisiInsert`;
export const LOOKUP_PERSON_FOR_ADMISI = `${environment.webApi}/admisi/Admisi/PersonGetPasienForLookupAdmisi`;
export const GET_ALL_ADMISI_BY_DYNAMIC_FILTER = `${environment.webApi}/admisi/Admisi/AdmisiPasienGetAllByDynamicFilter`;
export const GET_RIWAYAT_ADMISI_BY_DYNAMIC_FILTER = `${environment.webApi}/admisi/Pasien/GetHistoryRekamMedisPasienAll`;