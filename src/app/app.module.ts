import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './helper/jwt.interceptor';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './components/layout/base-layout/base-layout.component';
import { DokterLayoutComponent } from './components/layout/dokter-layout/dokter-layout.component';
import { ButtonPrimaryComponent } from './components/button/button-primary/button-primary.component';
import { ButtonGroupComponent } from './components/button/button-group/button-group.component';
import { HeadingComponent } from './components/typograph/heading/heading.component';
import { DescriptionComponent } from './components/typograph/description/description.component';
import { FormLabelComponent } from './components/typograph/form-label/form-label.component';
import { FilterComponent } from './components/navigation/filter/filter.component';
import { ActionButtonComponent } from './components/navigation/action-button/action-button.component';
import { GridComponent } from './components/grid/grid.component';
import { TabComponent } from './components/navigation/tab/tab.component';
import { TabItemComponent } from './components/navigation/tab/tab-item/tab-item.component';
import { TabHeaderComponent } from './components/navigation/tab/tab-item/tab-header/tab-header.component';
import { TabBodyComponent } from './components/navigation/tab/tab-item/tab-body/tab-body.component';
import { FormValidatorComponent } from './components/typograph/form-validator/form-validator.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { PendaftaranPasienComponent } from './pages/pendaftaran-pasien/pendaftaran-pasien.component';
import { SetupDokterComponent } from './pages/setup-data/setup-dokter/setup-dokter.component';
import { SetupTarifComponent } from './pages/setup-data/setup-tarif/setup-tarif.component';
import { SetupObatComponent } from './pages/setup-data/setup-obat/setup-obat.component';
import { GridButtonComponent } from './components/grid/grid-button/grid-button.component';
import { PelayananPasienComponent } from './pages/pelayanan-pasien/pelayanan-pasien.component';
import { FilterDialogComponent } from './components/navigation/filter-dialog/filter-dialog.component';
import { BillingComponent } from './pages/billing/billing.component';
import { CashComponent } from './pages/billing/payment-method/cash/cash.component';
import { QrisComponent } from './pages/billing/payment-method/qris/qris.component';
import { SetupMarketingComponent } from './pages/setup-data/setup-marketing/setup-marketing.component';
import { TreatmentComponent } from './pages/treatment/treatment.component';
import { SetupRoleComponent } from './pages/setup-data/setup-role/setup-role.component';
import { SetupUserComponent } from './pages/setup-data/setup-user/setup-user.component';
import { InputResepComponent } from './pages/farmasi/input-resep/input-resep.component';
import { InputBukaKasirComponent } from './pages/billing/input-buka-kasir/input-buka-kasir.component';
import { InputTutupKasirComponent } from './pages/billing/input-tutup-kasir/input-tutup-kasir.component';
import { ValidasiTutupKasirComponent } from './pages/billing/validasi-tutup-kasir/validasi-tutup-kasir.component';
import { DebitCardComponent } from './pages/billing/payment-method/debit-card/debit-card.component';
import { CreditCardComponent } from './pages/billing/payment-method/credit-card/credit-card.component';
import { HistoryTreatmentComponent } from './pages/treatment/history-treatment/history-treatment.component';
import { SetupMenuComponent } from './pages/setup-data/setup-menu/setup-menu.component';
import { SetupVoucherComponent } from './pages/setup-data/setup-voucher/setup-voucher.component';
import { RekamMedisPasienComponent } from './pages/rekam-medis-pasien/rekam-medis-pasien.component';
import { ListResepComponent } from './pages/farmasi/list-resep/list-resep.component';

@NgModule({
    declarations: [
        AppComponent,
        BaseLayoutComponent,
        DokterLayoutComponent,
        ButtonPrimaryComponent,
        HeadingComponent,
        DescriptionComponent,
        FormLabelComponent,
        ButtonGroupComponent,
        NavbarComponent,
        SidebarComponent,
        TabComponent,
        FilterComponent,
        ActionButtonComponent,
        GridComponent,
        TabItemComponent,
        TabHeaderComponent,
        TabBodyComponent,
        AuthenticationComponent,
        BerandaComponent,
        PendaftaranPasienComponent,
        FormValidatorComponent,
        SetupDokterComponent,
        SetupTarifComponent,
        SetupObatComponent,
        GridButtonComponent,
        PelayananPasienComponent,
        FilterDialogComponent,
        BillingComponent,
        CashComponent,
        QrisComponent,
        SetupMarketingComponent,
        TreatmentComponent,
        SetupRoleComponent,
        SetupUserComponent,
        InputResepComponent,
        InputBukaKasirComponent,
        InputTutupKasirComponent,
        ValidasiTutupKasirComponent,
        DebitCardComponent,
        CreditCardComponent,
        HistoryTreatmentComponent,
        SetupMenuComponent,
        SetupVoucherComponent,
        RekamMedisPasienComponent,
        ListResepComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DropDownListModule,
        DatePickerModule,
        NumericTextBoxModule,
        DateRangePickerModule,
        AgGridModule,
        ModalModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
