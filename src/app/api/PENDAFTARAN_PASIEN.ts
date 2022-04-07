import { environment } from "src/environments/environment";

export const GET_ALL_PERSON_PASIEN_DYNAMIC_FILTER = `${environment.webApi}/Person/PersonPasienGetAllByDynamicFilter`;

export const GET_ALL_JENIS_IDENTITAS = `${environment.webApi}/Person/jenisIdentitasGetAll`;
export const CHECK_IDENTITAS_PASIEN = `${environment.webApi}/Person/CheckPersonByNoIdentitas/`;
export const SAVE_PENDAFTARAN_PASIEN = `${environment.webApi}/Person/PendaftaranBaruPasienInsert`;
export const UPLOAD_FOTO_PASIEN = `${environment.webApi}/Person/UploadFotoPerson`;
export const GET_LINK_FOTO_PASIEN = `${environment.webApi}/Person/GetLinkFotoPerson/`;
export const UPDATE_PASIEN = `${environment.webApi}/Person/UpdatePerson`;
