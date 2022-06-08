import {Component, OnInit} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {CreateBugComponent} from '../create-bug/create-bug.component';
import {Bug} from '../../models/bug';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    title = 'BugOut-Frontend';
    showFiller = false;
    mode: MatDrawerMode = 'over';

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    openDialogBug() {
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

}
