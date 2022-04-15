import { environment } from "src/environments/environment";

export const GET_ALL_TARIF_DYNAMIC_FILTER = `${environment.webApi}/admisi/SetupObat/GetAllByDynamicFilter`;
export const GET_OBAT_BY_ID = `${environment.webApi}/admisi/SetupObat/GetById/`;
export const POST_SAVE_OBAT = `${environment.webApi}/admisi/SetupObat/Insert`;
export const PUT_UPDATE_OBAT = `${environment.webApi}/admisi/SetupObat/Update`;
export const PUT_UPDATE_STATUS_OBAT = `${environment.webApi}/admisi/SetupObat/UpdateStatusActive`;
export const DELETE_OBAT = `${environment.webApi}/admisi/SetupObat/Delete/`;
export const CETAK_RESEP_BY_ID_REGISTER = `${environment.webApi}/billing/Pdf/CetakResep/`;
