import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

    @ViewChild('SidebarComponent')
    SidebarComponent!: SidebarComponent;

    ShowSidebar: boolean = true;

    SidebarClass: string = "col-lg-2 col-md-2 col-sm-2 col-xs-2 px-0 grow";

    ContentClass: string = "col-lg-10 col-md-10 col-sm-10 col-xs-10 px-0 shrink";

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    onClickNavbarBrand(sidebarState: boolean): void {
        this.ShowSidebar = !sidebarState;
    }

    onClickSidebarMenu(url: string): void {
        this.router.navigateByUrl(url);
    }
}
