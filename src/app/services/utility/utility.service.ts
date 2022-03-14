import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(
        private router: Router
    ) { }

    onShowCustomAlert(icon: 'success' | 'warning' | 'error', title: string, message: string, customClass?: string): Promise<any> {
        return Swal.fire({
            icon,
            title,
            text: message,
            showCloseButton: false,
            showConfirmButton: true,
            customClass: {
                popup: customClass
            }
        });
    }

    onShowingMultipleMessageAlert(icon: any, title: string, message: any): Promise<any> {
        let text = "";

        message.forEach((item: any) => {
            text += `<li class="text-danger mb-1">${item}</li>`;
        });

        return Swal.fire({
            icon,
            title,
            html: `<ul>${text}</ul>`,
            showCloseButton: false,
            showConfirmButton: true,
            customClass: {
                popup: 'swal-wide',
                htmlContainer: 'text-justify'
            }
        })
    }

    onShowLoadingBeforeSend(): void {
        Swal.fire({
            title: 'Loading...',
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
    }

    onNavigatingPage(url: string): void {
        this.onShowLoadingBeforeSend();

        setTimeout(() => {
            Swal.close();
            this.router.navigateByUrl(url);
        }, 250);
    }

    onFormatDate(date: any, format?: string): any {
        moment.locale('id');
        const formattedDate = format ? moment(date).format(format) : moment(date).format();
        return formattedDate;
    }
}
