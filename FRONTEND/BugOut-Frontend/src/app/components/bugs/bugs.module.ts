import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BugsComponent} from './bugs.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CardComponent} from '../card/card.component';
import {CreateBugComponent} from '../create-bug/create-bug.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    declarations: [
        BugsComponent,
        CardComponent,
        CreateBugComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        DragDropModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class BugsModule {
}
