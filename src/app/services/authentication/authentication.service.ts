import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginModel, ILoginResponseModel, LoginResponseModel } from 'src/app/model/authentication.model';
import * as API_CONFIG from '../../api';
import { HttpRequestService } from '../http-request/http-request.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    API = API_CONFIG.API.AUTHENTICATION;

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private httpRequestService: HttpRequestService,
    ) { }

    onLogin(body: ILoginModel): void {
        this.httpRequestService.defaultPostRequest(this.API.LOGIN, body)
            .subscribe((result: LoginResponseModel) => {
                if (result.responseResult) {
                    const UserData: ILoginResponseModel = result.data;
                    localStorage.setItem('UserData', JSON.stringify(UserData));

                    this.utilityService.onShowCustomAlert('success', 'Success', 'Sign In Success')
                        .then(() => {
                            this.router.navigateByUrl('home');
                        });
                }
            })
    }

    onLogout(): void {
        this.httpRequestService.defaultPutRequest(this.API.LOGOUT, null)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.utilityService.onShowCustomAlert('success', 'Success', 'Sign Out Success')
                        .then(() => {
                            this.router.navigateByUrl('');
                            localStorage.clear();
                        });
                }
            })
    }
}
