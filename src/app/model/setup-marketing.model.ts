import { HttpResponseModel } from "./http-request.model"

export interface ISetupMarketingModel {
    id_marketing: number
    nama_marketing: string
    no_hp: string
    created_at: string
    created_by: number
    is_active: boolean
}

export class GetAllSetupMarketingModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupMarketingModel[]
}

export class GetByIdSetupMarketingModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupMarketingModel
}

export interface IInsertSetupMarketingModel {
    nama_marketing: string;
    no_hp: string;
}

export interface IUpdateSetupMarketingModel {
    id_marketing: number
    nama_marketing: string
    no_hp: string
}