import { environment } from "src/environments/environment";

export const SUMMARY_OMSET_TREATMENT = `${environment.webApi}/billing/ReportBilling/report_omset_treatment_summaryGetAllByDynamicFilter`;
export const DETAIL_OMSET_TREATMENT = `${environment.webApi}/billing/ReportBilling/report_omset_treatment_detailGetAllByDynamicFilter`;

export const SUMMARY_OMSET_OBAT = `${environment.webApi}/billing/ReportBilling/report_omset_obat_summaryGetAllByDynamicFilter`;
export const DETAIL_OMSET_OBAT = `${environment.webApi}/billing/ReportBilling/report_omset_obat_detailGetAllByDynamicFilter`;
