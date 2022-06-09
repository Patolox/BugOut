import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserComponent} from './user/user.component';
import {User} from '../../../models/user';
import {UserService} from '../../../shared/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[] = [];


    constructor(private dialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
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

    loadData() {
        this.userService.getAll()
            .subscribe(data => {
                this.users = data;
            });
    }

}
