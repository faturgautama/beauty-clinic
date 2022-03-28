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
    id_person: number
    no_identitas: string
    id_dokter: number
    kode_dokter: string
    full_name: string
    gender: string
    tgl_lahir: string
    alamat_lengkap: string
    no_hp: string
    keterangan: string
    is_active: boolean
}

export class GetAllDokterByDynamicFilterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: IPersonDokterModel[]
}