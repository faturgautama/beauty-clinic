import { Component, OnInit, ViewChild } from '@angular/core';
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

    constructor() {
    }

    ngOnInit(): void {
    }

    onClickNavbarBrand(sidebarState: boolean): void {

        this.ShowSidebar = !sidebarState;

        if (!this.ShowSidebar) {
            this.SidebarComponent.ShowSidebar = false;
        }

        if (this.ShowSidebar) {
            this.SidebarClass = "col-lg-2 col-md-2 col-sm-2 col-xs-2 px-0 grow";
            this.ContentClass = "col-lg-10 col-md-10 col-sm-10 col-xs-10 px-0 shrink";
        } else {
            this.SidebarClass = "col-lg-0 col-md-0 col-sm-0 col-xs-0 px-0 shrink";
            this.ContentClass = "col-lg-12 col-md-12 col-sm-12 col-xs-12 px-0 grow";
        }

        setTimeout(() => {
            this.SidebarComponent.ShowSidebar = this.ShowSidebar;
        }, 300);
    }
}
