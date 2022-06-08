import {Component, OnInit} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {TokenService} from '../../util/auth/token.service';
import {User} from '../../models/user';
import {LoginService} from '../../shared/login.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user!: User;
    mode: MatDrawerMode = 'over';


    constructor(public readonly dialog: MatDialog,
                private readonly tokenService: TokenService,
                private readonly loginService: LoginService) {
    }

    ngOnInit(): void {
        this.user = this.tokenService.getUser();
    }


    logout(): void {
        this.loginService.logout();
    }

}
