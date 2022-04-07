import { HttpResponseModel } from "./http-request.model"

export interface ISetupUserModel {
    id_user: number
    id_role: number
    nama_role: string
    user_name: string
    password: string
    full_name: string
    alamat_lengkap: string
    no_hp: string
    time_last_login: string
    time_last_logout: string
    is_active: boolean
    user_created: number
    user_name_created: string
    full_name_created: string
    time_created: string
    user_deactived: number
    user_name_deactived: string
    full_name_deactived: string
    time_deactived: string
}

export class GetAllUserModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupUserModel[]
}

export interface IInsertSetupUserModel {
    id_role: number
    user_name: string
    password: string
    full_name: string
    alamat_lengkap: string
    no_hp: string
}

export interface IUpdateSetupUserModel {
    id_user: number
    id_role: number
    user_name: string
    full_name: string
    alamat_lengkap: string
    no_hp: string
}
