import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bug} from '../../../../models/bug';
import {User} from '../../../../models/user';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() bug!: Bug;

    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    showContent(): boolean {
        return !!this.bug.description || !!this.bug.userId;
    }

    get user(): User {
        return <User>this.bug.user;
    }

}
