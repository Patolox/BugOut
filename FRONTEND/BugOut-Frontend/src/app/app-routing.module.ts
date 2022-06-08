import {BoardComponent} from './board/board.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {AuthGuard} from './util/auth/auth.guard';

const routes: Routes = [
    {path: '', component: BoardComponent, canActivate: [AuthGuard]},
    {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
