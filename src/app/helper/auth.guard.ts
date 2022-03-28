import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ILoginResponseModel } from "../model/authentication.model";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const UserData: ILoginResponseModel = JSON.parse(localStorage.getItem('UserData') as any);

        if (UserData) {
            return true;
        }

        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return true;
    }
}