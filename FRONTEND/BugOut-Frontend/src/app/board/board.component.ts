import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board, Talk, Track } from '../models/schema.model';
import { MatDialog } from '@angular/material/dialog';
import { IssueType } from '../models/schema.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    boards: Board[] = [];

    constructor(private _dialog: MatDialog) {
        let board1: Board = {
            title: 'To-DO',
            tracks: [
                {
                    title: 'BACKLOG',
                    talks: [
                        {
                            issueType: IssueType.Epic,
                            text: "Keynote addess",
                            speaker: "Igor Minar",
                            createdAt: new Date('2018-01-01'),
                            image: "https://i.ytimg.com/vi/7Bj4R7lGl4A/maxresdefault.jpg"
                        },
                        {
                            issueType: IssueType.Bug,
                            text: "VS Code Can Do That",
                            speaker: "John Papa",
                            createdAt: new Date('2020-02-01'),
                            tags: [
                                {
                                    "name": "Intro",
                                    "color": "#e0e0e0"
                                }
                            ]
                        },
                        {
                            issueType: IssueType.SubTask,
                            text: "How to save time & money by planning your ngUpgrade",
                            speaker: "Sam Julien",
                            createdAt: new Date('2019-03-01')
                        }
                    ],
                    id: 'backlog'
                },
                {
                    title: 'TO-DO',
                    talks: [
                        {
                            issueType: IssueType.Story,
                            text: "Upgrading to Angular without ngUpgrade",
                            speaker: "Erin Coughlan",
                            createdAt: new Date("2020-06-01")
                        },
                        {
                            issueType: IssueType.Task,
                            text: "Why you need a build system, and why it should be Bazel",
                            speaker: "Martin Probst",
                            createdAt: new Date("2020-07-01")
                        }
                    ],
                    id: 'todo'
                },
                {
                    title: 'DOING',
                    talks: [
                        {
                            issueType: IssueType.Task,
                            text: "Building an Angular PWA: Angular Service Worker or Workbox?",
                            speaker: "Maxim Salnikov",
                            createdAt: new Date("2020-09-01"),
                            tags: [
                              {
                                "name": "Deep-dive",
                                "color": "#e0e0e0"
                              }
                            ]
                          },
                          {
                            issueType: IssueType.Task,
                            text: "Angular Unit Testing - how to win friends, design better code, and get rich quick!",
                            speaker: "Shai Reznik",
                            createdAt: new Date("2020-10-01")
                          }
                    ],
                    id: 'doing'
                },
                {
                    title: 'DONE',
                    talks: [
                        {
                            issueType: IssueType.Bug,
                            text: "Automating UI development",
                            speaker: "Stefan Baumgartner and Katrin Freihofner",
                            createdAt: new Date("2020-11-01")
                          },
                          {
                            issueType: IssueType.Epic,
                            text: "RxJS schedulers in depth",
                            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/London_Thames_Sunset_panorama_-_Feb_2008.jpg/640px-London_Thames_Sunset_panorama_-_Feb_2008.jpg",
                            speaker: "Michael Hladky",
                            createdAt: new Date("2020-12-01"),
                            tags: [
                              {
                                "name": "Deep-dive",
                                "color": "#e0e0e0"
                              }
                            ]
                          },
                          {
                            issueType: IssueType.SubTask,
                            text: "The good, the bad and the ugly - Component architecture at scale",
                            speaker: "Ana Cidre and Sherry List",
                            createdAt: new Date("2019-01-01"),
                            tags: [
                              {
                                "name": "Deep-dive",
                                "color": "#e0e0e0"
                              }
                            ]
                          },
                          {
                            issueType: IssueType.Story,
                            text: "Universally speaking",
                            speaker: "Craig Spence",
                            createdAt: new Date("2019-02-01"),
                            tags: [
                              {
                                "name": "Deep-dive",
                                "color": "#e0e0e0"
                              }
                            ]
                          }
                    ],
                    id: 'done'
                }
            ]
        };
        this.boards.push(board1);


    }

    ngOnInit(): void { }

    trackIds(boardIndex: number): string[] {
        return this.boards[boardIndex].tracks.map(track => track.id);
    }

    onTalkDrop(event: CdkDragDrop<Talk[]>) {
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

    addEditTalk(talk: Talk, track: Track, edit = false) {
        // Use the injected dialog service to launch the previously created edit-talk
        // component. Once the dialog closes, we assign the updated talk data to
        // the specified talk.
        // this._dialog.open(EditTalkComponent, {data: {talk, edit}, width: '500px'})
        //   .afterClosed()
        //   .subscribe(newTalkData => edit ? Object.assign(talk, newTalkData) : track.talks.unshift(newTalkData));
    }

    deleteTalk(talk: Talk, track: Track) {
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

}
