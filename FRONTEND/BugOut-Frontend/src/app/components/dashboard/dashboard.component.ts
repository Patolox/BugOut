import {Component, OnInit} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {CreateBugComponent} from '../create-bug/create-bug.component';
import {Bug} from '../../models/bug';
import {TokenService} from '../../util/auth/token.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {LoginService} from '../../shared/login.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    mode: MatDrawerMode = 'over';

    user!: User;

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

    openDialogBug() {
        const dialogRef = this.dialog.open(CreateBugComponent, {
            width: '400px',
            height: '452px'
        });

        dialogRef.afterClosed()
            .subscribe((result: Bug) => {
                console.log('Dialog Closed!');
                console.log(`The result: ${result}`);
            });
    }

}
