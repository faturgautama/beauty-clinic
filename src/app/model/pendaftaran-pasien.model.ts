import { HttpResponseModel } from "./http-request.model"

export interface IJenisIdentitasModel {
    id_jenis_identitas: number
    jenis_identitas: string
}

export class GetAllJenisIdentitasModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IJenisIdentitasModel[]
}

export class CheckIdentitasPasienModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: {
        id_person: number
        no_identitas: string
        no_rekam_medis: string
        kode_dokter: string
    }
}

export interface IPersonModel {
    id_jenis_identitas: number
    no_identitas: string
    nama_depan: string
    nama_belakang: string
    gender: string
    tempat_lahir: string
    tanggal_lahir: string
    alamat_lengkap: string
    no_hp: string
    user_created: number
}

interface IPasienModel {
    keterangan: string;
}

export interface IPendaftaranPasienBaruModel {
    person: IPersonModel;
    pasien: IPasienModel;
}

export interface IPersonPasienModel {
    id_person: number
    no_identitas: string
    no_rekam_medis: string
    full_name: string
    gender: string
    tgl_lahir: string
    alamat_lengkap: string
    no_hp: string
    keterangan: string
    is_active: boolean
}

export class GetAllPasienByDynamicFilterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IPersonPasienModel[]
}