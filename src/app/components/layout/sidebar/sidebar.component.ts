import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginResponseModel, SidebarMenuModel } from 'src/app/model/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

    UserData!: ILoginResponseModel;

    ShowSidebar = true;

    SidebarMenu: SidebarMenuModel[] = [];

    ShowChild = false;

    @Output('onClickSidebarMenu') onClickSidebarMenu = new EventEmitter<any>();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.onGetSidebarMenu();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.UserData = JSON.parse(localStorage.getItem('UserData') as any);
        }, 1);
    }

    onBackToBeranda(): void {
        this.router.navigateByUrl('home')
    }

    onLogout(): void {
        this.authenticationService.onLogout();
    }

    onGetSidebarMenu(): void {
        const UserData: ILoginResponseModel = JSON.parse(localStorage.getItem('UserData') as any);

        const SidebarMenu = UserData.menuJson.sidebarMenu;

        this.SidebarMenu = SidebarMenu;
    }

    onClickSidebarMenuItem(sidebarMenu: SidebarMenuModel): void {
        this.onClickSidebarMenu.emit(sidebarMenu.url);
        // this.router.navigateByUrl(sidebarMenu.url);
    }

    onShowSidebarChildMenu(sidebarMenu: SidebarMenuModel, showChild: boolean): void {

        this.ShowChild = !showChild;

        const icon = document.getElementById(`${sidebarMenu.id_menu_sidebar}Icon`) as HTMLElement;
        const elem = document.getElementById(`${sidebarMenu.id_menu_sidebar}ChildMenuDiv`) as HTMLElement;

        if (this.ShowChild) {
            // ** Icon
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');

            // ** Child
            elem.classList.remove('hideChild');
            elem.classList.add('showChild');
        } else {
            // ** Icon
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-right');

            // ** Child
            elem.classList.add('hideChild');
            elem.classList.remove('showChild');
        }
    }
}
