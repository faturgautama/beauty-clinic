import { HttpResponseModel } from "./http-request.model"

export interface ISetupRoleModel {
    id_role: number
    nama_role: string
    keterangan: string
    time_auto_logout: number
    is_active: boolean
    user_created: number
    time_created: string
    user_deactived: number
    time_deactived: string
}

export class GetAllRoleModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupRoleModel[]
}

export interface IInsertSetupRoleModel {
    nama_role: string
    keterangan: string
    time_auto_logout: number
}

export interface IUpdateSetupRoleModel {
    id_role: number
    nama_role: string
    keterangan: string
    time_auto_logout: number
}
