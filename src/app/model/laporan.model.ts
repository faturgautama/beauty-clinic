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

export interface ISummaryPendapatanModel {
    id_payment_method: number
    nama_bank_payment: any
    payment_method: string
    jumlah_bayar: number
}

export class SummaryPendapatanModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISummaryPendapatanModel[]
}

export interface IDetailPendapatanModel {
    nama_pasien: string
    no_rekam_medis: string
    no_register: string
    tgl_invoice: string
    nomor_invoice: string
    payment_method: string
    jumlah_bayar: number
    nama_bank_payment: any
    id_payment_method: number
}

export class DetailPendapatanModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDetailPendapatanModel[]
}

export interface ISummaryFeeDokterModel {
    id_dokter: number
    kode_dokter: string
    nama_dokter: string
    fee_dokter: number
}

export class SummaryFeeDokter implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISummaryFeeDokterModel[]
}

export interface IDetailFeeDokterModel {
    no_register: string
    no_rekam_medis: string
    nama_pasien: string
    tgl_transaksi: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    paid_amount: number
    fee_dokter: number
}

export class DetailFeeDokter implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDetailFeeDokterModel[]
}

export interface ISummaryFeeBcModel {
    id_user: number
    full_name: string
    fee_pelaksana: number
}

export class SummaryFeeBc implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISummaryFeeBcModel[]
}

export interface IDetailFeeBcModel {
    no_register: string
    no_rekam_medis: string
    nama_pasien: string
    tgl_transaksi: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    paid_amount: number
    fee_pelaksana: number
}

export class DetailFeeBc implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDetailFeeBcModel[]
}