import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly tokenService: TokenService,
                private readonly router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const currentUser = this.tokenService.getUser();
        if (currentUser === null) {
            this.router.navigate(['/']).then();
            return false;
        }

        return true;
    }

}
