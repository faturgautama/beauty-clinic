import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginModel } from 'src/app/model/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    FormAuth!: FormGroup;

    SeePassword: boolean = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.FormAuth = this.formBuilder.group({
            user_name: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onTogglePassword(SeePassword: boolean): void {
        this.SeePassword = !SeePassword;

        const passwordInputField = document.getElementById('password') as HTMLInputElement;
        const passwordToggleIcon = document.getElementById('passwordToggleIcon') as HTMLElement;

        if (this.SeePassword) {
            passwordToggleIcon.classList.remove('fa-eye');
            passwordToggleIcon.classList.add('fa-eye-slash');
            passwordInputField.type = "text";
        } else {
            passwordToggleIcon.classList.add('fa-eye');
            passwordToggleIcon.classList.remove('fa-eye-slash');
            passwordInputField.type = "password";
        }
    }

    handleSubmitFormAuthentication(FormAuth: ILoginModel): void {
        this.authenticationService.onLogin(FormAuth);
    }

    get user_name(): AbstractControl { return this.FormAuth.get('user_name') as AbstractControl };
    get password(): AbstractControl { return this.FormAuth.get('password') as AbstractControl };
}
