import { HttpResponseModel } from "./http-request.model"

export interface ISummaryOmsetTreatmentModel {
    kode_setup_tarif: string
    nama_setup_tarif: string
    qty: number
    unit_amount: number
    total_amount: number
    diskon_nominal: number
    paid_amount: number
}

export class SummaryOmsetTreatmentModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISummaryOmsetTreatmentModel[]
}

export interface IDetailOmsetTreatmentModel {
    no_register: string
    no_rekam_medis: string
    nama_pasien: string
    tanggal_registrasi: string
    nomor_invoice: string
    tanggal_bayar: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    qty: number
    unit_amount: number
    total_amount: number
    diskon_prosentase: number
    diskon_nominal: number
    paid_amount: number
}

export class DetailOmsetTreatmentModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDetailOmsetTreatmentModel[]
}

export interface ISummaryOmsetObatModel {
    id_obat: number
    nama_obat: string
    qty: number
    unit_amount: number
    total_amount: number
    diskon_nominal: number
    paid_amount: number
}

export class SummaryOmsetObatModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISummaryOmsetObatModel[]
}

export interface IDetailOmsetObatModel {
    no_register: string
    no_rekam_medis: string
    nama_pasien: string
    tanggal_registrasi: string
    nomor_invoice: string
    tanggal_bayar: string
    id_obat: number
    nama_obat: string
    qty: number
    unit_amount: number
    total_amount: number
    diskon_nominal: number
    paid_amount: number
}

export class DetailOmsetObatModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDetailOmsetObatModel[]
}