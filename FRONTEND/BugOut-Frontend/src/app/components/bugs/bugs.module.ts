import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BugsComponent} from './bugs.component';
import {AppModule} from '../../app.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
    declarations: [
        BugsComponent
    ],
    imports: [
        CommonModule,
        AppModule,
        FlexLayoutModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        DragDropModule
    ]
})
export class BugsModule {
}
