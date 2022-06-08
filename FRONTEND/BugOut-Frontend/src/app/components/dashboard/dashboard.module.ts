import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {BugsComponent} from '../bugs/bugs.component';
import {UserListComponent} from '../user-list/user-list.component';


const routes = [
    {
        path: '',
        redirectTo: 'bugs',
        pathMatch: 'full'
    },
    {
        path: 'bugs',
        component: BugsComponent,
        loadChildren: () => import('../bugs/bugs.module').then(mod => mod.BugsModule),
    },
    {
        path: 'users',
        component: UserListComponent,
        loadChildren: () => import('../user-list/user-list.module').then(mod => mod.UserListModule),
    },
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule.forChild(routes),
    ]
})
export class DashboardModule {
}
