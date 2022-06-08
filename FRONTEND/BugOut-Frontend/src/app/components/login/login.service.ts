import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Token} from './token';
import {TokenStorageService} from '../../util/auth/token-storage.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly url = `${environment.api}/login`;


    constructor(private readonly http: HttpClient,
                private readonly router: Router,
                private readonly tokenStorage: TokenStorageService) {
    }


    login(username: string, password: string): Observable<Token> {
        return this.http.post<Token>(`${this.url}`, {username, password});
    }

    logout(): void {
        this.tokenStorage.signOut();
        this.router.navigate(['/login']).then();
    }

}
