import {Bug} from '../../../models/bug';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from '../../../models/schema.model';
import {BugService} from './services/bug.service';
import {Observable, Subscription} from 'rxjs';
import {TrackService} from 'src/app/components/dashboard/bugs/services/track.service';
import {Track} from '../../../models/track';
import {BugModalService} from './bug/bug-modal.service';
import {NotificationService} from '../../../util/notification.service';

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

    constructor(private readonly bugModalService: BugModalService,
                private readonly bugService: BugService,
                private readonly trackService: TrackService,
                private readonly notificationService: NotificationService) {
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

    openCreateBugModal(track: Track): void {
        const subscription = this.openBugModal('Criar Bug').subscribe(
            (newBug: Bug) => {
                if (newBug) {
                    newBug.trackId = track.id;
                    this.createBug(newBug);
                }
            });

        this.subscriptions.push(subscription);
    }

    openEditBugModal(bug: Bug): void {
        const subscription = this.openBugModal('Editar Bug', bug)
            .subscribe(newBug => !!newBug && this.updateBug(newBug));

        this.subscriptions.push(subscription);
    }

    private openBugModal(title: string, bug?: Bug): Observable<Bug> {
        return this.bugModalService.open({bug, title}).afterClosed();
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    createBug(bug: Bug) {
        const subscription = this.bugService.create(bug).subscribe({
            next: _ => {
                this.notificationService.success('Bug criado com sucesso!');
                this.loadData();
            },
            error: error => this.notificationService.error('Ocorreu um erro ao tentar criar o bug, tente novemente mais tarde.', error),
        });

        this.subscriptions.push(subscription);
    }

    updateBug(bug: Bug) {
        // @ts-ignore
        const subscription = this.bugService.update(bug.id, bug).subscribe({
            next: _ => {
                this.notificationService.success('Bug atualizado com sucesso!');
                this.loadData();
            },
            error: error => this.notificationService.error('Ocorreu um erro ao tentar atualizar o bug, tente novemente mais tarde.', error),
        });

        this.subscriptions.push(subscription);
    }

    deleteBug(bug: Bug) {
        const accept = confirm('Deseja mesmo deletar este bug?');
        if (!accept) {
            return;
        }

        // @ts-ignore
        const subscription = this.bugService.delete(bug.id).subscribe({
            next: _ => {
                this.notificationService.success('Bug deletado com sucesso!');
                this.loadData();
            },
            error: error => this.notificationService.error('Ocorreu um erro ao tentar deletar o bug, tente novemente mais tarde.', error),
        });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    private loadData(): void {
        const subscription = this.trackService.getAll().subscribe(
            {
                next: (data: Track[]) => this.boards[0].tracks = data,
                error: error => this.notificationService.error('Ocorreu um erro ao tentar carregar os dados, tente novemente mais tarde.', error),
            });

        this.subscriptions.push(subscription);
    }

    // ------------------------------------------------------------------------------------

}
