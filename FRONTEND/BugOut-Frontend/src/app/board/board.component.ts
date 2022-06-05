import { environment } from 'src/environments/environment';
import { Bug } from './../models/bug';
import { CreateBugComponent } from './../create-bug/create-bug.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Board, Talk, Track } from '../models/schema.model';
import { MatDialog } from '@angular/material/dialog';
import { IssueType } from '../models/schema.model';
import { BugService } from '../shared/bug.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/login.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
    boards: Board[] = [];
    bugs: Bug[] = [];

    subscriptions: Subscription[] = [];


    constructor(
        private readonly _dialog: MatDialog,
        private readonly bugService: BugService,
        private loginService: LoginService
    ) {
        let board1: Board = {
            title: 'Main Board',
            tracks: [
                {
                    title: 'BACKLOG',
                    bugs: [],
                    id: 'backlog'
                },
                {
                    title: 'TO-DO',
                    bugs: [],
                    id: 'todo'
                },
                {
                    title: 'DOING',
                    bugs: [],
                    id: 'doing'
                },
                {
                    title: 'DONE',
                    bugs: [],
                    id: 'done'
                }
            ]
        };
        this.boards.push(board1);
    }

    ngOnInit(): void {
        this.login();
        this.loadData();

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }


    trackIds(boardIndex: number): string[] {
        return this.boards[boardIndex].tracks.map(track => track.id);
    }

    onBugDrop(event: CdkDragDrop<Bug[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    onTrackDrop(event: CdkDragDrop<Track[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    addEditBug(track: Track, bug?: Bug, edit = false) {
        this._dialog.open(CreateBugComponent, { data: bug, width: '500px' })
            .afterClosed()
            .subscribe(newBugData => {
                edit ? Object.assign(bug, newBugData) : track.bugs.unshift(newBugData);
            });
    }

    deleteBug(bug: Bug, track: Track) {
        const accept = confirm('Tem certeza que deseja deletar esse bug?');
        if(accept){
            track.bugs.splice(track.bugs.indexOf(bug), 1);
        }
    }

    loadData(): void {
        this.bugService.getAll()
        .subscribe(data => {
            this.bugs = data;
            this.boards.forEach(board => {
                board.tracks.forEach(track => {
                    track.bugs = this.bugs;
                })
            });
        })
    }

    login(){
        this.loginService.login()
        .subscribe();
    }

}
