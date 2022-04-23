import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { BillingComponent } from './pages/billing/billing.component';
import { HistoryBilingComponent } from './pages/billing/history-biling/history-biling.component';
import { InputBukaKasirComponent } from './pages/billing/input-buka-kasir/input-buka-kasir.component';
import { InputTutupKasirComponent } from './pages/billing/input-tutup-kasir/input-tutup-kasir.component';
import { ValidasiTutupKasirComponent } from './pages/billing/validasi-tutup-kasir/validasi-tutup-kasir.component';
import { InputResepComponent } from './pages/farmasi/input-resep/input-resep.component';
import { DetailObatComponent } from './pages/laporan/detail-obat/detail-obat.component';
import { DetailTreatmentComponent } from './pages/laporan/detail-treatment/detail-treatment.component';
import { SummaryObatComponent } from './pages/laporan/summary-obat/summary-obat.component';
import { SummaryTreatmentComponent } from './pages/laporan/summary-treatment/summary-treatment.component';
import { PelayananPasienComponent } from './pages/pelayanan-pasien/pelayanan-pasien.component';
import { PendaftaranPasienComponent } from './pages/pendaftaran-pasien/pendaftaran-pasien.component';
import { RekamMedisPasienComponent } from './pages/rekam-medis-pasien/rekam-medis-pasien.component';
import { SetupDokterComponent } from './pages/setup-data/setup-dokter/setup-dokter.component';
import { SetupMarketingComponent } from './pages/setup-data/setup-marketing/setup-marketing.component';
import { SetupObatComponent } from './pages/setup-data/setup-obat/setup-obat.component';
import { SetupRoleComponent } from './pages/setup-data/setup-role/setup-role.component';
import { SetupTarifComponent } from './pages/setup-data/setup-tarif/setup-tarif.component';
import { SetupUserComponent } from './pages/setup-data/setup-user/setup-user.component';
import { SetupVoucherComponent } from './pages/setup-data/setup-voucher/setup-voucher.component';
import { HistoryTreatmentComponent } from './pages/treatment/history-treatment/history-treatment.component';
import { TreatmentComponent } from './pages/treatment/treatment.component';

const routes: Routes = [
    { path: '', component: AuthenticationComponent, data: { title: 'Sign In' } },
    { path: 'home', canActivate: [AuthGuard], component: BerandaComponent, data: { title: 'Beranda' } },
    {
        path: 'setup-data', canActivate: [AuthGuard], children: [
            { path: 'setup-dokter', component: SetupDokterComponent, data: { title: 'Setup Dokter' } },
            { path: 'setup-tarif', component: SetupTarifComponent, data: { title: 'Setup Tarif' } },
            { path: 'setup-obat', component: SetupObatComponent, data: { title: 'Setup Obat' } },
            { path: 'setup-marketing', component: SetupMarketingComponent, data: { title: 'Setup Marketing' } },
            { path: 'setup-role', component: SetupRoleComponent, data: { title: 'Setup Role' } },
            { path: 'setup-user', component: SetupUserComponent, data: { title: 'Setup User' } },
            { path: 'setup-voucher', component: SetupVoucherComponent, data: { title: 'Setup Voucher' } },
        ],
    },
    { path: 'pasien/pendaftaran-baru', canActivate: [AuthGuard], component: PendaftaranPasienComponent, data: { title: 'Pendaftaran Pasien' } },
    { path: 'pasien/pelayanan-pasien', canActivate: [AuthGuard], component: PelayananPasienComponent, data: { title: 'Pelayanan Pasien' } },
    { path: 'pasien/riwayat-pelayanan', canActivate: [AuthGuard], component: RekamMedisPasienComponent, data: { title: 'Riwayat Pelayanan' } },
    { path: 'input-treatment', canActivate: [AuthGuard], component: TreatmentComponent, data: { title: 'Treatment Pasien' } },
    { path: 'history-treatment', canActivate: [AuthGuard], component: HistoryTreatmentComponent, data: { title: 'History Treatment Pasien' } },
    { path: 'input-resep', canActivate: [AuthGuard], component: InputResepComponent, data: { title: 'Resep Pasien' } },
    { path: 'billing', canActivate: [AuthGuard], component: BillingComponent, data: { title: 'Pembayaran Billing' } },
    { path: 'billing/history', canActivate: [AuthGuard], component: HistoryBilingComponent, data: { title: 'History Billing' } },
    { path: 'input-buka-kasir', canActivate: [AuthGuard], component: InputBukaKasirComponent, data: { title: 'Buka Kasir' } },
    { path: 'input-tutup-kasir', canActivate: [AuthGuard], component: InputTutupKasirComponent, data: { title: 'Tutup Kasir' } },
    { path: 'validasi-tutup-kasir', canActivate: [AuthGuard], component: ValidasiTutupKasirComponent, data: { title: 'Validasi Tutup Kasir' } },
    { path: 'laporan/summary-omset-treatment', canActivate: [AuthGuard], component: SummaryTreatmentComponent, data: { title: 'Summary Omset Treatment' } },
    { path: 'laporan/detail-omset-treatment', canActivate: [AuthGuard], component: DetailTreatmentComponent, data: { title: 'Detail Omset Treatment' } },
    { path: 'laporan/summary-omset-obat', canActivate: [AuthGuard], component: SummaryObatComponent, data: { title: 'Summary Obat Treatment' } },
    { path: 'laporan/detail-omset-obat', canActivate: [AuthGuard], component: DetailObatComponent, data: { title: 'Detail Obat Treatment' } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
