import { HttpResponseModel } from "./http-request.model"

export interface ISaveAdmisiPasienModel {
    id_person: number
    no_rekam_medis: string
    id_dokter: number
    keluhan: string
}

export class PostSaveAdmisiPasienModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: {
        no_register: string;
        no_urut_antrian: string;
    }
}

export interface IGetAdmisiPasienModel {
    id_register: number
    id_person: number;
    no_antrian: string
    tgl_admisi: string
    no_rekam_medis: string
    no_register: string
    nama_pasien: string
    gender: string
    umur: string
    keluhan?: string
}

export class GetAllAdmisiPasienModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IGetAdmisiPasienModel[]
}

export interface IGetPersonForLookupAdmisiModel {
    id_person: number
    no_identitas: string
    nomor_kartu: string
    no_rekam_medis: string
    id_jenis_member: number
    jenis_member: any
    full_name: string
    gender: any
    tanggal_lahir: string
    alamat_lengkap: string
    no_hp: string
    is_active: boolean
}
