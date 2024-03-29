import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Token} from '../../components/user-access/login/token';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }


    signOut(): void {
        window.sessionStorage.clear();
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getUser(): User {
        const json = window.sessionStorage.getItem(USER_KEY);
        return json != null ? JSON.parse(json) : {};
    }

    public saveUser(user: Token): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

}
