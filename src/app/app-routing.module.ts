import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { PelayananPasienComponent } from './pages/pelayanan-pasien/pelayanan-pasien.component';
import { PendaftaranPasienComponent } from './pages/pendaftaran-pasien/pendaftaran-pasien.component';
import { SetupDokterComponent } from './pages/setup-data/setup-dokter/setup-dokter.component';
import { SetupObatComponent } from './pages/setup-data/setup-obat/setup-obat.component';
import { SetupTarifComponent } from './pages/setup-data/setup-tarif/setup-tarif.component';

const routes: Routes = [
    { path: '', component: AuthenticationComponent, data: { title: 'Sign In' } },
    { path: 'home', canActivate: [AuthGuard], component: BerandaComponent, data: { title: 'Beranda' } },
    {
        path: 'setup-data', canActivate: [AuthGuard], children: [
            { path: 'setup-dokter', component: SetupDokterComponent, data: { title: 'Setup Dokter' } },
            { path: 'setup-tarif', component: SetupTarifComponent, data: { title: 'Setup Tarif' } },
            { path: 'setup-obat', component: SetupObatComponent, data: { title: 'Setup Obat' } },
        ],
    },
    { path: 'pendaftaran-pasien', canActivate: [AuthGuard], component: PendaftaranPasienComponent, data: { title: 'Pendaftaran Pasien' } },
    { path: 'pelayanan-pasien', canActivate: [AuthGuard], component: PelayananPasienComponent, data: { title: 'Pelayanan Pasien' } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
