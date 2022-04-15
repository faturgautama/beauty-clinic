import { HttpResponseModel } from "./http-request.model"

export interface IRiwayatPelayananPasienModel {
    id_person: number
    nomor_kartu: string
    no_identitas: string
    no_rekam_medis: string
    alamat_lengkap: string
    no_hp_1: string
    no_hp_2: any
    no_hp_3: any
    url_photo?: string
    path_foto?: string
    nama_foto?: string
    nama_pasien: string
    gender: string
    umur: string
    info_pasien: InfoPasienModel[]
}

export interface InfoPasienModel {
    id_register: number
    tgl_admisi: string
    no_rekam_medis: string
    no_register: string
    resep: Resep[]
    tindakan: Tindakan[]
}

export interface Resep {
    id_register: number
    id_transaksi_obat: number
    waktu: string
    id_obat: number
    nama_obat: string
    qty: number
    total: number
    status: string
}

export interface Tindakan {
    id_register: number
    id_transaksi: number
    waktu_formated: string
    kode_setup_tarif: string
    nama_setup_tarif: string
    qty: number
    dokter: string
    total: number
    status: string
    bc_transaksi: any
}

export class GetRiwayatPelayananPasienModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IRiwayatPelayananPasienModel[]
}