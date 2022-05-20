import { Component, OnInit } from '@angular/core';
import { Board } from '../models/schema.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    boards: Board[] = [];

    constructor() {
        let board1: Board = {
            title: 'To-DO',
            tracks: [
                {
                    title: 'BACKLOG',
                    talks: [],
                    id: 'backlog'
                },
                {
                    title: 'TO-DO',
                    talks: [],
                    id: 'todo'
                },
                {
                    title: 'DOING',
                    talks: [],
                    id: 'doing'
                },
                {
                    title: 'DONE',
                    talks: [],
                    id: 'done'
                }
            ]
        };
        this.boards.push(board1);

    }

    ngOnInit(): void {}

}
