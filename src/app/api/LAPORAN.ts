import { environment } from "src/environments/environment";

export const SUMMARY_OMSET_TREATMENT = `${environment.webApi}/billing/ReportBilling/report_omset_treatment_summaryGetAllByDynamicFilter`;
export const DETAIL_OMSET_TREATMENT = `${environment.webApi}/billing/ReportBilling/report_omset_treatment_detailGetAllByDynamicFilter`;

export const SUMMARY_OMSET_OBAT = `${environment.webApi}/billing/ReportBilling/report_omset_obat_summaryGetAllByDynamicFilter`;
export const DETAIL_OMSET_OBAT = `${environment.webApi}/billing/ReportBilling/report_omset_obat_detailGetAllByDynamicFilter`;

export const SUMMARY_PENDAPATAN = `${environment.webApi}/billing/ReportBilling/report_pendapatan`;
export const DETAIL_PENDAPATAN = `${environment.webApi}/billing/ReportBilling/report_pendapatan_detailByDynamicFilter`;

export const SUMMARY_FEE_DOKTER = `${environment.webApi}/billing/ReportBilling/report_fee_dokter_summary`;
export const DETAIL_FEE_DOKTER = `${environment.webApi}/billing/ReportBilling/report_fee_dokter_detail`;

export const SUMMARY_FEE_BC = `${environment.webApi}/billing/ReportBilling/report_fee_bc_summary`;
export const DETAIL_FEE_BC = `${environment.webApi}/billing/ReportBilling/report_fee_bc_detail`;
