import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { BillingComponent } from './pages/billing/billing.component';
import { InputBukaKasirComponent } from './pages/billing/input-buka-kasir/input-buka-kasir.component';
import { InputTutupKasirComponent } from './pages/billing/input-tutup-kasir/input-tutup-kasir.component';
import { ValidasiTutupKasirComponent } from './pages/billing/validasi-tutup-kasir/validasi-tutup-kasir.component';
import { InputResepComponent } from './pages/farmasi/input-resep/input-resep.component';
import { PelayananPasienComponent } from './pages/pelayanan-pasien/pelayanan-pasien.component';
import { PendaftaranPasienComponent } from './pages/pendaftaran-pasien/pendaftaran-pasien.component';
import { SetupDokterComponent } from './pages/setup-data/setup-dokter/setup-dokter.component';
import { SetupMarketingComponent } from './pages/setup-data/setup-marketing/setup-marketing.component';
import { SetupObatComponent } from './pages/setup-data/setup-obat/setup-obat.component';
import { SetupRoleComponent } from './pages/setup-data/setup-role/setup-role.component';
import { SetupTarifComponent } from './pages/setup-data/setup-tarif/setup-tarif.component';
import { SetupUserComponent } from './pages/setup-data/setup-user/setup-user.component';
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
        ],
    },
    { path: 'pendaftaran-pasien', canActivate: [AuthGuard], component: PendaftaranPasienComponent, data: { title: 'Pendaftaran Pasien' } },
    { path: 'pelayanan-pasien', canActivate: [AuthGuard], component: PelayananPasienComponent, data: { title: 'Pelayanan Pasien' } },
    { path: 'input-treatment', canActivate: [AuthGuard], component: TreatmentComponent, data: { title: 'Treatment Pasien' } },
    { path: 'input-resep', canActivate: [AuthGuard], component: InputResepComponent, data: { title: 'Resep Pasien' } },
    { path: 'billing', canActivate: [AuthGuard], component: BillingComponent, data: { title: 'Pembayaran Billing' } },
    { path: 'input-buka-kasir', canActivate: [AuthGuard], component: InputBukaKasirComponent, data: { title: 'Buka Kasir' } },
    { path: 'input-tutup-kasir', canActivate: [AuthGuard], component: InputTutupKasirComponent, data: { title: 'Tutup Kasir' } },
    { path: 'validasi-tutup-kasir', canActivate: [AuthGuard], component: ValidasiTutupKasirComponent, data: { title: 'Validasi Tutup Kasir' } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
