import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

    PageTitle: string;

    @Output('handleClickNavbarBrand') handleClickNavbarBrand = new EventEmitter<any>();

    constructor() {
        this.PageTitle = "Beranda"
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const pageTitle = localStorage.getItem('PageTitle');
            this.PageTitle = pageTitle as string;
        }, 1);
    }

    onClickNavbarBrand(args: any): void {
        this.handleClickNavbarBrand.emit(args);
    }
}
