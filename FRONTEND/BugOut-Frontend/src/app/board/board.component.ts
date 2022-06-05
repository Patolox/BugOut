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

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
    boards: Board[] = [];
    bugs: Bug[] = [];

    subscriptions: Subscription[] = [];


    constructor(private readonly _dialog: MatDialog,
        private readonly bugService: BugService) {
        let board1: Board = {
            title: 'To-DO',
            tracks: [
                {
                    title: 'BACKLOG',
                    bugs: [
                        {
                            id: 1,
                            title: "Keynote addess",
                            description: "Igor Minar",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "VS Code Can Do That",
                            description: "John Papa",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "How to save time & money by planning your ngUpgrade",
                            description: "Sam Julien",
                            assignedTo: 0
                        }
                    ],
                    id: 'backlog'
                },
                {
                    title: 'TO-DO',
                    bugs: [
                        {
                            id: 1,
                            title: "Upgrading to Angular without ngUpgrade",
                            description: "Erin Coughlan",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "Why you need a build system, and why it should be Bazel",
                            description: "Martin Probst",
                            assignedTo: 0
                        }
                    ],
                    id: 'todo'
                },
                {
                    title: 'DOING',
                    bugs: [
                        {
                            id: 1,
                            title: "Building an Angular PWA: Angular Service Worker or Workbox?",
                            description: "Maxim Salnikov",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "Angular Unit Testing - how to win friends, design better code, and get rich quick!",
                            description: "Shai Reznik",
                            assignedTo: 0
                        }
                    ],
                    id: 'doing'
                },
                {
                    title: 'DONE',
                    bugs: [
                        {
                            id: 1,
                            title: "Automating UI development",
                            description: "Stefan Baumgartner and Katrin Freihofner",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "RxJS schedulers in depth",
                            description: "Michael Hladky",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "The good, the bad and the ugly - Component architecture at scale",
                            description: "Ana Cidre and Sherry List",
                            assignedTo: 0
                        },
                        {
                            id: 1,
                            title: "Universally speaking",
                            description: "Craig Spence",
                            assignedTo: 0
                        }
                    ],
                    id: 'done'
                }
            ]
        };
        this.boards.push(board1);
    }

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }


    trackIds(boardIndex: number): string[] {
        return this.boards[boardIndex].tracks.map(track => track.id);
    }

    onBugDrop(event: CdkDragDrop<Bug[]>) {
        // In case the destination container is different from the previous container, we
        // need to transfer the given talk to the target data array. This happens if
        // a talk has been dropped on a different track.
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
        // Use the injected dialog service to launch the previously created edit-talk
        // component. Once the dialog closes, we assign the updated talk data to
        // the specified talk.
        this._dialog.open(CreateBugComponent, { data: bug, width: '500px' })
            .afterClosed()
            .subscribe(newBugData => {
                console.log(newBugData);
                edit ? Object.assign(bug, newBugData) : track.bugs.unshift(newBugData);
            });
    }

    deleteBug(bug: Bug, track: Track) {
        const accept = confirm('Tem certeza que deseja deletar esse bug?');
        if(accept){
            track.bugs.splice(track.bugs.indexOf(bug), 1);
        }
        // Open a dialog
        // this._dialog.open(DeleteTalkComponent, { data: talk, width: '500px' })
        //     .afterClosed()
        //     .subscribe(response => {
        //         // Wait for it to close and delete the talk if the user agreed.
        //         if (response) {
        //             track.talks.splice(track.talks.indexOf(talk), 1);
        //         }
        //     });
    }

    loadData(): void {
        const subscription = this.bugService.getAll()
            .subscribe(
                data => this.bugs = data,
                (error: HttpErrorResponse) => console.error(error)
            );

        this.subscriptions.push(subscription);
    }

}
