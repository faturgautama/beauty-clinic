import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    constructor(
        private router: Router,
        private utilityService: UtilityService
    ) { }

    ngOnInit(): void {
    }

    handleSubmitFormAuthentication(args: any): void {
        this.utilityService.onNavigatingPage('home');
    }
}
