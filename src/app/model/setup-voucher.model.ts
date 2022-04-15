import { HttpResponseModel } from "./http-request.model"

export interface ISetupVoucherModel {
    id_voucher: number
    kode_voucher: string
    nama: string
    keterangan: string
    nominal_voucher: number
    prosentase_voucher: number
    user_inputed: number
    time_inputed: string
    is_active: boolean
}

export class GetAllVoucherByDynamicFilterModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupVoucherModel[]
}

export class GetVoucherByIdModel implements HttpResponseModel {
    responseResult!: boolean
    message!: string
    data!: ISetupVoucherModel
}

export interface IInsertSetupVoucherModel {
    kode_voucher: string
    nama: string
    keterangan: string
    nominal_voucher: number
    prosentase_voucher: number
}

export interface IUpdateSetupVoucherModel {
    id_voucher: number
    kode_voucher: string
    nama: string
    keterangan: string
    nominal_voucher: number
    prosentase_voucher: number
}