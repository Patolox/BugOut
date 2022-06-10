import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BugComponent, BugData} from './bug.component';

@Injectable({
    providedIn: 'root'
})
export class BugModalService {

    constructor(private readonly dialog: MatDialog) {
    }

    open(data: BugData): MatDialogRef<BugComponent> {
        return this.dialog.open(BugComponent, {
            width: '500px',
            data,
        });
    }

}
