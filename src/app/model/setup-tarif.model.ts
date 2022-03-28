import { HttpResponseModel } from "./http-request.model"

export interface ISetupTarifModel {
    id_setup_tarif: number
    kode_setup_tarif: string
    nama_setup_tarif: string
    is_paket: boolean
    nominal_tarif: number
    is_active: boolean
    user_created: number
    time_created: string
    user_deactived: number
    time_deactived: string
}

export class GetAllTarifByDynamicFilterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupTarifModel[]
}

export class GetTarifByIdModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupTarifModel
}

export interface IInsertSetupTarifModel {
    nama_setup_tarif: string;
    nominal_tarif: number;
    is_paket: boolean;
}

export interface IUpdateSetupTarifModel {
    id_setup_tarif: number;
    nama_setup_tarif: string;
    nominal_tarif: number;
    is_paket: boolean;
}