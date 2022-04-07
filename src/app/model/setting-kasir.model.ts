import { HttpResponseModel } from "./http-request.model"

export interface IRiwayatModalKasirModel {
    id_saldo_kasir: number
    nomor_saldo_kasir: string
    user_kasir: number
    user_name: string
    waktu_buka_kasir: string
    waktu_tutup_kasir: string
    keterangan_tutup_kasir: string
    user_validasi: number
    waktu_validasi: string
    keterangan_validasi: string
    jumlah_modal_awal: number
    jumlah_setoran: number
    jumlah_penerimaan_ver_sistem: number
    jumlah_penerimaan_ver_kasir: number
    is_match: boolean
    status_saldo: string
}

export class GetHistoryModalKasirModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IRiwayatModalKasirModel[]
}

export interface IInsertBukaKasirModel {
    user_kasir: number
    jumlah_modal_awal: number
}

export interface IInsertTambahModalKasirModel {
    user_kasir: number
    tambahan_modal: number
}

export interface RekapPaymentKasir {
    id_payment_method: number
    jumlah_penerimaan: number
}

export interface IInsertTutupKasirModel {
    keterangan_tutup_kasir: string
    rekap_payment_kasir: RekapPaymentKasir[]
}

export interface IHistoryTutupKasirModel {
    id_saldo_kasir: number
    nomor_saldo_kasir: string
    user_kasir: number
    user_name: string
    waktu_buka_kasir: string
    waktu_tutup_kasir: string
    keterangan_tutup_kasir: string
    user_validasi: number
    waktu_validasi: string
    keterangan_validasi: string
    jumlah_modal_awal: number
    jumlah_setoran: number
    jumlah_penerimaan_ver_sistem: number
    jumlah_penerimaan_ver_kasir: number
    is_match: boolean
    status_saldo: string
}

export class GetHistoryTutupKasirModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IHistoryTutupKasirModel[]
}

export interface IDetailPendapatanKasir {
    id_saldo_kasir: number
    id_payment_method: number
    payment_method: string
    jumlah_bayar: number
}

export class GetDetailPendapatanKasirModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDetailPendapatanKasir[]
}

export interface IValidasiTutupKasirModel {
    id_saldo_kasir: number
    keterangan_validasi: string
}

export class GetHistoryValidasiTutupKasirModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IHistoryTutupKasirModel[]
}