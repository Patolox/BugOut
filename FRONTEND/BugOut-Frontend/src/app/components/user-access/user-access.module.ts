import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {UserAccessComponent} from './user-access.component';


@NgModule({
    declarations: [
        UserAccessComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [
        UserAccessComponent
    ]
})
export class UserAccessModule {
}
