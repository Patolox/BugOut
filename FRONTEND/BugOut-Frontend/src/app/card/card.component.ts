import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueType } from '../models/schema.model';
import { appConstants } from './../appConstants';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    issueTypesWithColor = appConstants.issueTypeListWithColor;
    issueTypes;
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Input() text?: string = '';
    @Input() author?: string = '';
    @Input() tags?: [] = [];
    @Input() image?: string = '';
    @Input() issueType?: string;
    @Input() createdAt?: Date = new Date;

    constructor() {
        this.issueTypes = Object.values(IssueType);
    }

    ngOnInit(): void {
    }

}
