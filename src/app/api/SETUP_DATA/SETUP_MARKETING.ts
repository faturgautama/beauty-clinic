import { environment } from "src/environments/environment";

export const GET_ALL = `${environment.webApi}/SetupMarketing/GetAll`;
export const GET_BY_ID = `${environment.webApi}/SetupMarketing/GetById/`;
export const GET_ALL_BY_DYNAMIC_FILTER = `${environment.webApi}/SetupMarketing/GetAllByDynamicFilter`;
export const INSERT = `${environment.webApi}/SetupMarketing/Insert`;
export const DELETE = `${environment.webApi}/SetupMarketing/Delete/`;
export const UPDATE = `${environment.webApi}/SetupMarketing/Update`;
export const UPDATE_STATUS = `${environment.webApi}/SetupMarketing/UpdateStatus`;
