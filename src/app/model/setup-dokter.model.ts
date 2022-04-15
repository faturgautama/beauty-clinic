import { HttpResponseModel } from "./http-request.model";
import { IPersonModel } from "./pendaftaran-pasien.model";

interface IDokterModel {
    no_surat_ijin_praktek: string
    tgl_exp_surat_ijin_praktek: string
    no_str: string
    tgl_exp_str: string
    user_created: number
}

export interface ISetupDokterModel {
    person: IPersonModel;
    dokter: IDokterModel;
}

export interface IPersonDokterModel {
    id_jenis_identitas: number
    no_identitas: string
    nama_depan: string
    nama_belakang: string
    gender: string
    tempat_lahir: string
    tanggal_lahir: string
    alamat_lengkap: string
    no_hp_1: string
    no_hp_2: string
    no_hp_3: string
    path_foto: string
    nama_foto: string
}

export class GetAllDokterByDynamicFilterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IPersonDokterModel[]
}

export interface IUpdateDokterModel {
    id_dokter: number
    id_person: number
    no_surat_ijin_praktek: string
    tgl_exp_surat_ijin_praktek: string
    no_str: string
    tgl_exp_str: string
}