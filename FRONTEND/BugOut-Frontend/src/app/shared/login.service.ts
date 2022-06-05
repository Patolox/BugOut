import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly url = `${environment.API}/login`;

    constructor(
        private readonly http: HttpClient
    ) { }

    login(): Observable<Token>{
        return this.http.post<Token>(`/api/login`, {
            "username": "admin",
            "password": "password"
        }).pipe(
            tap((token: Token) => {
                localStorage.setItem('user_token', token.token);
            }),
            take(1)
        );
    }
}
