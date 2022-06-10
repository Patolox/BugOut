import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {UserAccessModule} from '../user-access.module';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        UserAccessModule,
    ]
})
export class LoginModule {
}
