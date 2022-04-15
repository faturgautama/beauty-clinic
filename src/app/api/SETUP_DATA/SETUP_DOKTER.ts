import { environment } from "src/environments/environment";

export const GET_ALL_PERSON_DOKTER = `${environment.webApi}/Person/PersonDokterGetAll`;
export const GET_ALL_PERSON_DOKTER_DYNAMIC_FILTER = `${environment.webApi}/Person/PersonDokterGetAllByDynamicFilter`;

export const GET_ALL_JENIS_IDENTITAS = `${environment.webApi}/Person/jenisIdentitasGetAll`;
export const CHECK_IDENTITAS_DOKTER = `${environment.webApi}/Person/CheckPersonByNoIdentitas/`;
export const SAVE_PENDAFTARAN_DOKTER = `${environment.webApi}/Person/PendaftaranBaruDokterInsert`;
export const UPLOAD_FOTO_DOKTER = `${environment.webApi}/Person/UploadFotoPerson`;
export const GET_LINK_FOTO_DOKTER = `${environment.webApi}/Person/GetLinkFotoPerson/`;
export const GET_DETAIL_DOKTER = `${environment.webApi}/Person/GetPersonDokterDetails/`;
export const UPDATE_DETAIL_DOKTER = `${environment.webApi}/Person/UpdateDokter`;
export const UPDATE_STATUS_ACTIVE_DOKTER = `${environment.webApi}/Person/UpdateDokterStatusActive`;