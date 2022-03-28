import { HttpResponseModel } from "./http-request.model"

export interface ISetupObatModel {
    id_obat: number
    nama_obat: string
    deskripsi_obat: string
    keterangan_pemakaian: string
    harga_jual: number
    prosentase_ppn: number
    user_created: number
    time_created: string
    user_edited: number
    time_edited: string
    is_active: boolean
}

export class GetAllObatByDynamicFilterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupObatModel[]
}

export class GetObatByIdModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupObatModel
}

export interface IInsertSetupObatModel {
    nama_obat: string
    deskripsi_obat: string
    keterangan_pemakaian: string
    harga_jual: number
    prosentase_ppn: number
}

export interface IUpdateSetupObatModel {
    id_obat: number
    nama_obat: string
    deskripsi_obat: string
    keterangan_pemakaian: string
    harga_jual: number
    prosentase_ppn: number
}