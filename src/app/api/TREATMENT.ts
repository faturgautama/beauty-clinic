import { environment } from "src/environments/environment";

export const INSERT = `${environment.webApi}/admisi/Transaksi/Insert`;
export const INSERT_WITH_RESEP = `${environment.webApi}/admisi/Transaksi/InsertTransaksiWithResep`;
export const CANCEL = `${environment.webApi}/admisi/Transaksi/Cancel`;
export const UPDATE_BC = `${environment.webApi}/admisi/Transaksi/UpdateBC`;
export const GET_HISTORY = `${environment.webApi}/admisi/Transaksi/GetHistoryByIdRegister/`;
