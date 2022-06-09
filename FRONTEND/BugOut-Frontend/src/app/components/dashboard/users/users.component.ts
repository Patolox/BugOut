import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../shared/user.service';
import {TokenService} from '../../../util/auth/token.service';
import {UserModalService} from './user/user-modal.service';
import {NotificationService} from '../../../util/notification.service';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

    users: User[] = [];

    currentUser!: User;

    private readonly subscriptions: Subscription[] = [];


    // ------------------------------------------------------------------------------------

    constructor(private readonly userModalService: UserModalService,
                private readonly userService: UserService,
                private readonly tokenService: TokenService,
                private readonly notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.currentUser = this.tokenService.getUser();
        this.loadData();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    openCreateUserModal(): void {
        const subscription = this.openUserModal('Criar Usuário', 'create')
            .subscribe(newUser => !!newUser && this.createUser(newUser));

        this.subscriptions.push(subscription);
    }

    openEditUserModal(user: User): void {
        const subscription = this.openUserModal('Editar Usuário', 'edit', user)
            .subscribe(newUser => !!newUser && this.updateUser(newUser));

        this.subscriptions.push(subscription);
    }

    private openUserModal(title: string, mode: 'create' | 'edit', user?: User): Observable<User> {
        return this.userModalService.open({user, title, mode}).afterClosed();
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    createUser(user: User) {
        const subscription = this.userService.create(user).subscribe(
            {
                next: _ => {
                    this.notificationService.success('Usuário criado com sucesso!');
                    this.loadData();
                },
                error: error => this.notificationService.error('Ocorreu um erro ao tentar criar o usuário, tente novemente mais tarde.', error),
            });

        this.subscriptions.push(subscription);
    }

    updateUser(user: User) {
        // @ts-ignore
        const subscription = this.userService.update(user.id, user).subscribe(
            {
                next: _ => {
                    this.notificationService.success('Usuário atualizado com sucesso!');
                    this.loadData();
                },
                error: error => this.notificationService.error('Ocorreu um erro ao tentar atualizar o usuário, tente novemente mais tarde.', error),
            });

        this.subscriptions.push(subscription);
    }

    deleteUser(event: MouseEvent, user: User) {
        event.stopPropagation();

        const accept = confirm('Deseja mesmo deletar este usuário?');
        if (!accept) {
            return;
        }

        // @ts-ignore
        const subscription = this.userService.delete(user.id).subscribe(
            {
                next: _ => {
                    this.notificationService.success('Usuário deletado com sucesso!');
                    this.loadData();
                },
                error: error => this.notificationService.error('Ocorreu um erro ao tentar deletar o usuário, tente novemente mais tarde.', error),
            });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    canDeleteUser(user: User): boolean {
        return this.currentUser.id !== user.id;
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    private loadData(): void {
        const subscription = this.userService.getAll().subscribe(
            {
                next: data => this.users = data,
                error: error => this.notificationService.error('Ocorreu um erro ao tentar carregar os dados, tente novemente mais tarde.', error),
            });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------

}
