import { Component, OnInit } from '@angular/core';
import { ILoginResponseModel } from 'src/app/model/authentication.model';

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.css']
})
export class BerandaComponent implements OnInit {

    UserData: ILoginResponseModel = JSON.parse(localStorage.getItem('UserData') as any);

    constructor() { }

    ngOnInit(): void {
    }

}
