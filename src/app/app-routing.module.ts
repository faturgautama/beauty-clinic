import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { PendaftaranPasienComponent } from './pages/pendaftaran-pasien/pendaftaran-pasien.component';

const routes: Routes = [
    { path: '', component: AuthenticationComponent, data: { title: 'Sign In' } },
    { path: 'home', component: BerandaComponent, data: { title: 'Beranda' } },
    { path: 'pendaftaran-pasien', component: PendaftaranPasienComponent, data: { title: 'Pendaftaran Pasien' } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
