import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
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

import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { PendaftaranPasienComponent } from './pages/pendaftaran-pasien/pendaftaran-pasien.component';
import { FormValidatorComponent } from './components/typograph/form-validator/form-validator.component';

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
        DateRangePickerModule,
        AgGridModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
