import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserComponent} from './user/user.component';
import {User} from '../../../models/user';
import {UserService} from '../../../shared/user.service';
import {TokenService} from '../../../util/auth/token.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[] = [];

    currentUser!: User;


    constructor(private readonly dialog: MatDialog,
                private readonly userService: UserService,
                private readonly tokenService: TokenService) {
    }

    ngOnInit(): void {
        this.currentUser = this.tokenService.getUser();
        this.loadData();
    }

    createUser() {
        const dialogRef = this.dialog.open(UserComponent, {
            width: "400px"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.users.push(result)
        });
        // dialogRef.afterClosed().subscribe(result => {
        //   this.userService.create(result)
        // });
    }

    editUser(user: User) {
        const dialogRef = this.dialog.open(UserComponent, {
            data: user,
            width: "400px",
        });
        // dialogRef.afterClosed().subscribe(result => {
        //   this.userService.update(user)
        // });
    }

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);
        // dialogRef.afterClosed().subscribe(result => {
        //   this.userService.delete(user.id)
        // });
    }

    canDeleteUser(user: User): boolean {
        return this.currentUser.id !== user.id;
    }

    loadData() {
        this.userService.getAll()
            .subscribe(data => {
                this.users = data;
            });
    }

}
