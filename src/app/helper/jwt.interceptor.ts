import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ILoginResponseModel } from "../model/authentication.model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const WebApiUrl = req.url.startsWith(`${environment.webApi}`);

        const IsUserLoggedIn: ILoginResponseModel = JSON.parse(localStorage.getItem('UserData') as any);

        if (WebApiUrl && IsUserLoggedIn) {
            const modifiedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${IsUserLoggedIn.token}`
                }
            });

            return next.handle(modifiedRequest);
        } else {
            return next.handle(req);
        }
    }
}