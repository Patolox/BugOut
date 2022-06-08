import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListComponent} from './user-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
      UserListComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class UserListModule { }
