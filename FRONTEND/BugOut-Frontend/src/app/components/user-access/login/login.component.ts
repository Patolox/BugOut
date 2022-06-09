import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from '../../../util/auth/token.service';
import {LoginService} from '../../../shared/login.service';
import {NotificationService} from '../../../util/notification.service';
import {ViewType} from '../../../shared/view-type.enum';
import {UserAccessConfig} from '../user-access.component';
import {User} from '../../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loading!: boolean;

    readonly viewType = ViewType.FILL;
    readonly config: UserAccessConfig = {
        title: 'Login',
        mainBtn: 'Login',
        secondBtn: 'Registrar'
    };

    private readonly subscriptions: Subscription[] = [];


    // ------------------------------------------------------------------------------------

    constructor(private readonly router: Router,
                private readonly tokenStorage: TokenService,
                private readonly loginService: LoginService,
                private readonly notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    register(): void {
        this.router.navigate(['/register']).then();
    }

    login(user: User): void {
        this.loading = true;

        const subscription = this.loginService.login(user.username, user.password).subscribe({
            next: user => {
                this.tokenStorage.saveToken(user.token);
                this.tokenStorage.saveUser(user);

                this.router.navigate(['/dashboard']).then();
            },
            error: error => this.notificationService.error('Ocorreu um erro ao tentar fazer o login, tente novemente mais tarde.', error),
        });
        subscription.add(() => this.loading = false)

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------

}
