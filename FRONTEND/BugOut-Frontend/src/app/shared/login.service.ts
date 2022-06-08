import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Token} from '../models/token';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly url = `${environment.api}/login`;


    constructor(private readonly http: HttpClient) {
    }


    login(username: string, password: string): Observable<Token> {
        return this.http.post<Token>(`${this.url}`, {username, password});
    }

}
