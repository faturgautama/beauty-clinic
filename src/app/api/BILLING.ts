import { environment } from "src/environments/environment";

export const GET_EDC_PAYMENT = `${environment.webApi}/billing/SetEdcPayment/GetAll`;
export const GET_BANK_PAYMENT = `${environment.webApi}/billing/SetBankPayment/GetAll`;

export const GET_ALL_PASIEN_FOR_BILLING = `${environment.webApi}/billing/TransBilling/PersonPasienGetAllByDynamicFilter`;
export const GET_DATA_BILLING_BY_NO_REG = `${environment.webApi}/billing/TransBilling/GetDataBilling/`;
export const INSERT_INVOICE_WITH_PAYMENT = `${environment.webApi}/billing/TrInvoice/InsertInvoiceWithPayment`;

export const CETAK_NOTA_BY_ID_REGISTER = `${environment.webApi}/billing/Pdf/CetakNota/`;
