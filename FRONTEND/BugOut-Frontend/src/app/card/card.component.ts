import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueType } from '../models/schema.model';
import { appConstants } from './../appConstants';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Input() title?: string = '';
    @Input() description?: string = '';
    @Input() assignedTo?: number;
    // @Input() tags?: [] = [];
    // @Input() issueType?: string;
    // @Input() createdAt?: Date = new Date;

    constructor() {
    }

    ngOnInit(): void {
    }

}
