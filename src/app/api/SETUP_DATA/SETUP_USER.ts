import { environment } from "src/environments/environment";

export const GET_USER_KASIR = `${environment.webApi}/User/GetUserKasir`;
export const GET_ALL_USER = `${environment.webApi}/User/GetUserAll`;
export const GET_ALL_USER_DYNAMIC_FILTER = `${environment.webApi}/User/GetAllByDynamicFilter`;
export const INSERT = `${environment.webApi}/User/InsertUser`;
export const UPDATE = `${environment.webApi}/User/UpdateUser`;
export const DEACTIVATED = `${environment.webApi}/User/UserDeactivated`;
export const ACTIVATED = `${environment.webApi}/User/UserActivated/`;
