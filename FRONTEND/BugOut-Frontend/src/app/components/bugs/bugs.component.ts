import {Bug} from '../../models/bug';
import {CreateBugComponent} from '../create-bug/create-bug.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from '../../models/schema.model';
import {MatDialog} from '@angular/material/dialog';
import {BugService} from '../../shared/bug.service';
import {Subscription} from 'rxjs';
import {TrackService} from '../../shared/track.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Track} from '../../models/track';

@Component({
    selector: 'app-bugs',
    templateUrl: './bugs.component.html',
    styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit, OnDestroy {

    boards: Board[] = [{title: 'Main Board', tracks: []}];
    bugs: Bug[] = [];

    private readonly subscriptions: Subscription[] = [];


    constructor(private readonly _dialog: MatDialog,
                private readonly bugService: BugService,
                private readonly trackService: TrackService,
                private readonly toastrService: ToastrService) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }


    trackIds(boardIndex: number): string[] {
        return this.boards[boardIndex].tracks.map(track => track.id.toString(10));
    }

    onBugDrop(event: CdkDragDrop<Bug[]>) {
        const container = event.container;
        const previousContainer = event.previousContainer;
        const fromIndex = event.previousIndex;
        const toIndex = event.currentIndex;

        const data = container.data;

        if (previousContainer === container) {
            moveItemInArray(data, fromIndex, toIndex);
        } else {
            transferArrayItem(previousContainer.data, data, fromIndex, toIndex);

            const containerId = Number(container.id);

            const draggedBugs = data.filter(item => item.trackId !== containerId);
            console.log(draggedBugs)
            draggedBugs.forEach(item => {
                item.trackId = containerId;
                this.updateBug(item);
            });
        }
    }

    onTrackDrop(event: CdkDragDrop<Track[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    addEditBug(track: Track, bug?: Bug, edit = false) {
        this._dialog.open(CreateBugComponent, {data: bug, width: '500px'})
            .afterClosed()
            .subscribe((newBugData: Bug) => {
                console.log(edit);
                if (edit) {
                    console.log('Info antiga:', bug);
                    console.log('Info nova: ', newBugData);
                }
                newBugData.trackId = track.id;
                edit ? this.updateBug(newBugData) : this.createBug(newBugData);
            });
    }

    deleteBug(bug: Bug, track: Track) { // TODO está com bug na hora de deletar um card com apenas o título
        const accept = confirm('Tem certeza que deseja deletar esse bug?');
        if (accept) {
            // @ts-ignore
            this.bugService.delete(bug.id)
                .subscribe(response => {
                    this.loadData();
                });
        }
    }

    createBug(newBug: Bug) {
        this.bugService.create(newBug)
            .subscribe(response => {
                this.loadData();
            });
    }

    updateBug(bug: Bug) {
        // @ts-ignore
        this.bugService.update(bug.id, bug)
            .subscribe(response => {
                this.loadData();
            })
    }

    loadData(): void {
        const subscription = this.trackService.getAll().subscribe(
            {
                next: data => this.boards[0].tracks = data,
                error: (error: HttpErrorResponse) =>
                    this.toastrService.error(error.error?.exception || 'Ocorreu um erro ao tentar carregar os dados, tente novemente mais tarde.'),
            });

        this.subscriptions.push(subscription);
    }

}
