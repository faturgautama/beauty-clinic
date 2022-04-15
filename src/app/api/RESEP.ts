import { environment } from "src/environments/environment";

export const INSERT = `${environment.webApi}/admisi/resep/Insert`;
export const CANCEL = `${environment.webApi}/admisi/resep/Cancel`;
export const GET_HISTORY = `${environment.webApi}/admisi/resep/GetHistoryByIdRegister/`;
export const CETAK_RESEP_BY_ID_REGISTER = `${environment.webApi}/billing/Pdf/CetakResep/`;
