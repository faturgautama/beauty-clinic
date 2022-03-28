import { environment } from "src/environments/environment";

export const GET_ALL_TARIF_DYNAMIC_FILTER = `${environment.webApi}/billing/SetupTarif/GetAllByDynamicFilter`;
export const GET_TARIF_BY_ID = `${environment.webApi}/billing/SetupTarif/GetById/`;
export const POST_SAVE_TARIF = `${environment.webApi}/billing/SetupTarif/Insert`;
export const PUT_UPDATE_TARIF = `${environment.webApi}/billing/SetupTarif/Update`;
export const PUT_UPDATE_STATUS_TARIF = `${environment.webApi}/billing/SetupTarif/UpdateStatusActive`;
