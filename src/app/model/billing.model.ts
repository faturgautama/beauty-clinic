import { HttpResponseModel } from "./http-request.model"

export interface IPasienForBillingModel {
    id_register: number
    no_identitas: string
    no_register: string
    id_person: number
    no_rekam_medis: string
    tgl_admisi: string
    nama_pasien: string
    alamat_pasien: string
}

export interface InformasiPasienForBillingModel {
    id_register: number
    no_register: string
    id_person: number
    link_foto: string
    nama_foto: string
    no_rekam_medis: string
    tgl_admisi: string
    nama_pasien: string
    alamat_pasien: string
    status_billing: string
    total_biaya: number
    total_payment: number
}

export interface TindakanBillingModel {
    jenis_transaksi: string
    total: number
    detail: DetailTindakanBillingModel[]
}

export interface DetailTindakanBillingModel {
    id_transaksi: number
    tgl_order: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    qty: number
    unit_amount: number
    total_amount: number
    total_amount_treatment: number
    status_bayar: boolean
    diskon_nominal?: number
    diskon_prosentase?: number
}

export interface ResepBillingModel {
    jenis_transaksi: string
    total: number
    detail: DetailResepBillingModel[]
}

export interface DetailResepBillingModel {
    id_transaksi_obat: number
    id_register: number
    tgl_transaksi: string
    id_obat: number
    nama_obat: string
    qty: number
    unit_amount: number
    total_amount: number
    diskon_prosentase?: number
    diskon_nominal?: number
    total_bayar: number
    status_bayar: string
}

export interface IDataBilingModel {
    informasi_pasien: InformasiPasienForBillingModel
    tdmk: TindakanBillingModel
    resep: ResepBillingModel
}

export class GetDataBillingModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IDataBilingModel
}

// ** Insert Billing
export interface TransHeader {
    id_register: number
    total_amount: number
    id_marketing: number
    id_voucher: number
    applied_ppn_procentage?: number
    applied_ppn_nominal?: number
    applied_service_fee_procentage?: number
    applied_service_fee_nominal?: number
}

export interface TransDetail {
    id_transaksi: number
    qty: number
    unit_amount: number
    total_amount: number
    diskon_nominal?: number
}

export interface ResepDetail {
    id_transaksi_obat: number
    qty: number
    unit_amount: number
    total_amount: number
    diskon_nominal?: number
}

export interface Payment {
    jumlah_payment: number
    keterangan: string
    pembayar: string
}

export interface PaymentDetail {
    id_payment_method: number
    payment_method?: string
    id_payment_method_detail: number
    kurang_bayar?: number
    jumlah_bayar: number
    id_voucher: number
    id_bank_payment: number
    id_edc_payment: number
    trace_number: string
    jenis_kartu: string
    card_holder: string
    nomor_kartu: string
}

export interface IInsertBillingModel {
    trans_header: TransHeader
    trans_detail: TransDetail[]
    resep_detail: ResepDetail[]
    payment: Payment
    payment_detail: PaymentDetail[]
}

// ** History Billing
export interface IHistoryBillingHeaderModel {
    id_register: number
    no_register: string
    keluhan: string
    no_rekam_medis: string
    nama_pasien: string
    nama_dokter: string
    time_inputed: string
    time_closed_bill: string
}

export class GetHistoryBillingModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IHistoryBillingHeaderModel[]
}

export class GetHistoryBillingDetailModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: {
        id_register: number
        no_register: string
        keluhan: string
        no_rekam_medis: string
        nama_pasien: string
        nama_dokter: string
        time_inputed: string
        time_closed_bill: string
        history_treatment: HistoryTreatment[]
        history_obat: HistoryObat[]
        history_payment: HistoryPayment[]
    }
}

export interface HistoryTreatment {
    id_invoice: number
    nomor_invoice: string
    tgl_invoice: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    qty: number
    unit_amount: number
    diskon_nominal: number
    total_amount: number
    id_register: number
}

export interface HistoryObat {
    id_invoice: number
    nomor_invoice: string
    tgl_invoice: string
    nama_obat: string
    qty: number
    unit_amount: number
    diskon_nominal: number
    total_amount: number
    id_register: number
}

export interface HistoryPayment {
    id_payment_method?: number
    payment_method: string
    jumlah_bayar: number
}