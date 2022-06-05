import { Bug } from './models/bug';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { CreateBugComponent } from './create-bug/create-bug.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'BugOut-Frontend';
    showFiller = false;
    mode: MatDrawerMode = 'over';

    constructor(
        public dialog: MatDialog
    ){}


    MenuButton() {
        console.log('teste');
    }

    openDialogBug(){
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

    openDialogUser(){

    }
}
