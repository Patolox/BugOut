import {Injectable, Injector} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {catchError, NEVER, Observable, throwError} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly tokenService: TokenStorageService,
                private readonly router: Router,
                private readonly injector: Injector) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        }

        return next.handle(authReq).pipe(catchError(error => this.handleAuthError(error)));
    }


    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        console.error('Interceptor caught http error');
        console.error(error);

        const toastr = this.injector.get(ToastrService);

        // @ts-ignore
        if (!error.url.match('/') && (error.status === 401 || error.status === 403)) {
            toastr.error('Erro durante a autenticação com o servidor.');
            setTimeout(() => this.router.navigateByUrl(`/`), 5000);
            return NEVER;
        }

        // handle your auth error or rethrow
        return throwError(error);
    }

}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
        deps: [TokenStorageService, Router, Injector, ToastrService],
        useFactory(token: TokenStorageService, router: Router, injector: Injector): AuthInterceptor {
            return new AuthInterceptor(token, router, injector);
        }
    }
];
