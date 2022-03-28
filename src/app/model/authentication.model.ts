import { HttpResponseModel } from "./http-request.model";

export interface ILoginModel {
    user_name: string;
    password: string;
}

export interface SidebarMenuModel {
    id_menu_sidebar: number
    caption: string
    icon: string
    url: string
    is_parent: boolean
    id_menu_sidebar_parent: number
    sidebarChild: SidebarMenuModel[]
}

export interface ILoginResponseModel {
    id_user: number
    id_karyawan: number
    id_role: number
    nama_role: string
    user_name: string
    full_name: string
    token: string
    menuJson: { sidebarMenu: SidebarMenuModel[] };
    timeOut: number
}

export class LoginResponseModel implements HttpResponseModel {
    responseResult!: boolean;
    message!: string;
    data!: ILoginResponseModel;
}