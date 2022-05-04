import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as AOS from 'aos';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'Angular';

    constructor(
        private router: Router,
        private titleService: Title,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        AOS.init();
        this.onGetPageTitle();
    }

    onGetPageTitle(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const routeData = this.onGetChild(this.activatedRoute);

                routeData.data.subscribe((data: any) => {
                    localStorage.setItem('PageTitle', data.title);
                    this.titleService.setTitle(data.title);
                })
            });
    }

    onGetChild(activatedRoute: ActivatedRoute): any {
        if (activatedRoute.firstChild) {
            return this.onGetChild(activatedRoute.firstChild);
        } else {
            return activatedRoute;
        }
    }
}
