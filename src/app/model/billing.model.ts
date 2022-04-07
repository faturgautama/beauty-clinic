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
    status_bayar: string
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
    status_bayar: boolean
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
}

export interface TransDetail {
    id_transaksi: number
    qty: number
    unit_amount: number
    total_amount: number
}

export interface ResepDetail {
    id_transaksi_obat: number
    qty: number
    unit_amount: number
    total_amount: number
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