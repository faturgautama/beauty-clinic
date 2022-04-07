import { HttpResponseModel } from "./http-request.model"

export interface IInsertResepModel {
    id_register: number
    id_obat: number
    nama_obat: string
    qty: number
    unit_amount: number
    total_amount: number
}

export interface ICancelResepModel {
    id_transaksi_obat: number
    reason_canceled: string
}

export interface DetailResepModel {
    id_register: number
    id_transaksi_obat: number
    waktu: string
    id_obat: number
    nama_obat: string
    qty: number
    total: number
    status: string
}

export class GetAllResepByIdRegisterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: DetailResepModel[]
}