import { environment } from "src/environments/environment";

export const BUKA_KASIR_INSERT = `${environment.webApi}/billing/TrSaldoKasir/BukaKasirByPengawas`;
export const BUKA_KASIR_TAMBAH_MODAL = `${environment.webApi}/billing/TrSaldoKasir/TambahModalByPengawas`;
export const BUKA_KASIR_HISTORY = `${environment.webApi}/billing/TrSaldoKasir/GetHistoryOpened`;

export const TUTUP_KASIR_INSERT = `${environment.webApi}/billing/TrSaldoKasir/TutupKasir`;
export const TUTUP_KASIR_INSERT_SPESIAL = `${environment.webApi}/billing/TrSaldoKasir/TutupKasirV2`;
export const TUTUP_KASIR_CANCEL = `${environment.webApi}/billing/TrSaldoKasir/TutupKasirBatal/`;
export const TUTUP_KASIR_HISTORY = `${environment.webApi}/billing/TrSaldoKasir/GetHistoryClosed`;
export const TUTUP_KASIR_HISTORY_DYNAMIC = `${environment.webApi}/billing/TrSaldoKasir/GetHistoryClosedDynamic`;
export const TUTUP_KASIR_GET_REKAP_SPESIAL = `${environment.webApi}/billing/TrSaldoKasir/GetDaftarPaymentAndInvoicePerKasirV2/`;

export const VALIDASI_GET_PENDAPATAN_BY_KASIR = `${environment.webApi}/billing/TrSaldoKasir/GetPendapatanVersiKasir/`;
export const VALIDASI_GET_PENDAPATAN_BY_SYSTEM = `${environment.webApi}/billing/TrSaldoKasir/GetPendapatanVersiSistem/`;
export const VALIDASI_INSERT = `${environment.webApi}/billing/TrSaldoKasir/ValidasiKasir`;
export const VALIDASI_HISTORY = `${environment.webApi}/billing/TrSaldoKasir/GetHistoryValidatedDynamic`;