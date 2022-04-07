import { HttpResponseModel } from "./http-request.model"

interface DetailPelaksanaTindakanModel {
    id_user: number
    id_role: number
}

interface DetailTransaksiModel {
    id_setup_tarif: number
    id_dokter: number
    pelaksana_tindakan: DetailPelaksanaTindakanModel[]
    qty: number
}

export interface IInsertTreatmentModel {
    id_register: number
    item_transaksi: DetailTransaksiModel[]
}

export interface ICancelTreatmentModel {
    id_register: number
    id_transaksi: number
    total_amount: number
    reason_canceled: string
}

export interface DetailTreatmentModel {
    id_register: number
    id_transaksi: number
    waktu_formated: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    qty: number
    dokter: string
    total: number
}

export class GetAllTreatmenByIdRegisterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: DetailTreatmentModel[]
}