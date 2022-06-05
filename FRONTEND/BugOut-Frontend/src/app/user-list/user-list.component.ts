import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from '../models/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  constructor(private dialog:MatDialog, private userServ:UserService) { }

  ngOnInit(): void {
    this.userList = [
      {id:0,username:"Cicero", email:"cicero.111@unicap.br", password:"123"},
      {id:1,username:"Bruno", email:"bruno.222@unicap.br", password:"123"},
    ]
  }

  openDialogUser(){
    const dialogRef = this.dialog.open(CreateUserComponent, {
        width: "400px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userList.push(result)
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.userServ.create(result)
    // });
  }

  editUser(user:User){
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: user,
      width: "400px",
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.userServ.update(user)
    // });
  }

  deleteUser(user:User){
    this.userList.splice(this.userList.indexOf(user), 1);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.userServ.delete(user.id)
    // });
  }

}
