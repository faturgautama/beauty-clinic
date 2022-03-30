import { HttpResponseModel } from "./http-request.model"

export interface ISetupCaraPakaiObatModel {
    id_cara_pakai_obat: number
    cara_pakai_obat: string
}

export class GetAllSetupCaraPakaiObatModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupCaraPakaiObatModel[]
}