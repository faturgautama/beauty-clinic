import { environment } from "src/environments/environment";

export const GET_ALL_TARIF_DYNAMIC_FILTER = `${environment.webApi}/billing/SetVoucher/SetVoucherGetAllByDynamicFilter`;
export const GET_ALL = `${environment.webApi}/billing/SetVoucher/GetAll`;
export const GET_BY_ID = `${environment.webApi}/billing/SetVoucher/GetById/`;
export const POST_SAVE = `${environment.webApi}/billing/SetVoucher/Insert`;
export const PUT_UPDATE = `${environment.webApi}/billing/SetVoucher/Update`;
export const POST_UPDATE_STATUS = `${environment.webApi}/billing/SetVoucher/UpdateStatusActive`;
export const DELETE = `${environment.webApi}/billing/SetVoucher/Delete/`;
