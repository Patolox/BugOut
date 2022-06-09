import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserComponent, UserData} from './user.component';

@Injectable({
    providedIn: 'root'
})
export class UserModalService {

    constructor(private readonly dialog: MatDialog) {
    }

    open(data: UserData): MatDialogRef<UserComponent> {
        return this.dialog.open(UserComponent, {
            width: '400px',
            data,
        });
    }

}
