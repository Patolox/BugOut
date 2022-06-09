import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../models/user';
import {NotificationService} from '../../../util/notification.service';
import {ViewType} from '../../../shared/view-type.enum';
import {UserAccessConfig} from '../user-access.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    loading!: boolean;

    readonly viewType = ViewType.CREATE;
    readonly config: UserAccessConfig = {
        title: 'Registrar',
        mainBtn: 'Registrar',
        secondBtn: 'Cancelar'
    };

    private readonly subscriptions: Subscription[] = [];


    // ------------------------------------------------------------------------------------

    constructor(private readonly router: Router,
                private readonly notificationService: NotificationService,
                private readonly userService: UserService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    cancel(): void {
        this.gotoLoginPage();
    }

    register(user: User): void {
        this.loading = true;

        const subscription = this.userService.create(user).subscribe({
            next: _ => {
                this.notificationService.success('Registro feito com sucesso!');
                this.gotoLoginPage();
            },
            error: error => this.notificationService.error('Ocorreu um erro ao tentar fazer o registro, tente novemente mais tarde.', error),
        });
        subscription.add(() => this.loading = false)

        this.subscriptions.push(subscription);
    }

    private gotoLoginPage(): void {
        this.router.navigate(['/']).then();
    }

    // ------------------------------------------------------------------------------------

}
