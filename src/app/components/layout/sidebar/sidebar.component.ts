import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarMenuModel {
    id: number;
    caption: string;
    icon: string;
    url: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    ShowSidebar = true;

    SidebarMenu: SidebarMenuModel[];

    constructor(
        private router: Router
    ) {
        this.SidebarMenu = [
            {
                id: 1,
                caption: 'Setup Data',
                icon: 'fa-cog',
                url: ''
            },
            {
                id: 2,
                caption: 'Pendaftaran Pasien',
                icon: 'fa-user',
                url: '/pendaftaran-pasien'
            },
            {
                id: 3,
                caption: 'Pelayanan Pasien',
                icon: 'fa-hospital-user',
                url: ''
            },
            {
                id: 4,
                caption: 'Tindakan',
                icon: 'fa-procedures',
                url: ''
            },
            {
                id: 5,
                caption: 'Farmasi',
                icon: 'fa-file-prescription',
                url: ''
            },
            {
                id: 6,
                caption: 'Billing',
                icon: 'fa-money-check-alt',
                url: ''
            },
        ]
    }

    ngOnInit(): void {
    }

    onClickSidebarMenuItem(sidebarMenu: SidebarMenuModel): void {
        let currentElem = document.getElementById(`paragraph${sidebarMenu.id}`);

        this.SidebarMenu.forEach((item) => {
            if (item.id != sidebarMenu.id) {
                let elem = document.getElementById(`paragraph${item.id}`);

                if (elem?.classList.contains('active')) {
                    elem.classList.remove('active');
                };

                currentElem?.classList.add('active');
            }
        });

        this.router.navigateByUrl(sidebarMenu.url);
    }
}
