import { environment } from "src/environments/environment";

export const GET_ALL_PERSON_DOKTER = `${environment.webApi}/Person/PersonDokterGetAll`;
export const GET_ALL_PERSON_DOKTER_DYNAMIC_FILTER = `${environment.webApi}/Person/PersonDokterGetAllByDynamicFilter`;

export const GET_ALL_JENIS_IDENTITAS = `${environment.webApi}/Person/jenisIdentitasGetAll`;
export const CHECK_IDENTITAS_DOKTER = `${environment.webApi}/Person/CheckPersonByNoIdentitas/`;
export const SAVE_PENDAFTARAN_DOKTER = `${environment.webApi}/Person/PendaftaranBaruDokterInsert`;
