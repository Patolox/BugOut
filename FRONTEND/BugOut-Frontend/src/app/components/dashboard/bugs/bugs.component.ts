import {Bug} from '../../../models/bug';
import {BugComponent} from './bug/bug.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from '../../../models/schema.model';
import {MatDialog} from '@angular/material/dialog';
import {BugService} from '../../../shared/bug.service';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {TrackService} from 'src/app/shared/track.service';
import {Track} from '../../../models/track';

@Component({
    selector: 'app-bugs',
    templateUrl: './bugs.component.html',
    styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit, OnDestroy {

    bugs: Bug[] = [];
    boards: Board[] = [{title: 'Main Board', tracks: []}];

    private readonly subscriptions: Subscription[] = [];


    // ------------------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    onDragAndDropSameColumn(event: CdkDragDrop<any[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    onDragAndDropDifferentColumns(event: CdkDragDrop<any[]>) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    onBugDragAndDrop(event: CdkDragDrop<Bug[]>) {
        if (event.previousContainer === event.container) {
            this.onDragAndDropSameColumn(event);
            return;
        }

        this.onDragAndDropDifferentColumns(event);

        const containerId = Number(event.container.id);
        const draggedBugs = event.container.data.filter(item => item.trackId !== containerId);
        draggedBugs.forEach(item => {
            item.trackId = containerId;
            this.updateBug(item);
        });
    }

    trackIds(boardIndex: number): string[] {
        return this.boards[boardIndex].tracks.map(track => track.id.toString(10));
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    addEditBug(track: Track, bug?: Bug, edit = false) {
        const subscription = this._dialog.open(BugComponent, {data: bug, width: '500px'})
            .afterClosed()
            .subscribe((newBug: Bug) => {
                newBug.trackId = track.id;
                edit ? this.updateBug(newBug) : this.createBug(newBug);
            });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    createBug(bug: Bug) {
        const subscription = this.bugService.create(bug).subscribe({
            next: _ => {
                this.toastrService.success('Bug criado com sucesso!');
                this.loadData();
            }, error: (error: HttpErrorResponse) =>
                this.toastrService.error(error.error?.exception || 'Ocorreu um erro ao tentar criar o bug, tente novemente mais tarde.'),
        });

        this.subscriptions.push(subscription);
    }

    updateBug(bug: Bug) {
        // @ts-ignore
        const subscription = this.bugService.update(bug.id, bug).subscribe({
            next: _ => {
                this.toastrService.success('Bug atualizado com sucesso!');
                this.loadData();
            }, error: (error: HttpErrorResponse) =>
                this.toastrService.error(error.error?.exception || 'Ocorreu um erro ao tentar atualizar o bug, tente novemente mais tarde.'),
        });

        this.subscriptions.push(subscription);
    }

    deleteBug(bug: Bug) { // TODO está com bug na hora de deletar um card com apenas o título
        const accept = confirm('Deseja mesmo deletar este bug?');
        if (!accept) {
            return;
        }

        // @ts-ignore
        const subscription = this.bugService.delete(bug.id).subscribe({
            next: _ => {
                this.toastrService.success('Bug deletado com sucesso!');
                this.loadData();
            }, error: (error: HttpErrorResponse) =>
                this.toastrService.error(error.error?.exception || 'Ocorreu um erro ao tentar deletar o bug, tente novemente mais tarde.'),
        });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    loadData(): void {
        const subscription = this.trackService.getAll().subscribe(
            {
                next: (data: Track[]) => this.boards[0].tracks = data,
                error: (error: HttpErrorResponse) =>
                    this.toastrService.error(error.error?.exception || 'Ocorreu um erro ao tentar carregar os dados, tente novemente mais tarde.'),
            });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------

}
