import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './util/auth/auth.guard';
import {LoginComponent} from './components/user-access/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/user-access/register/register.component';

const routes: Routes = [
    {
        path: 'login',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoginComponent,
        loadChildren: () => import('./components/user-access/login/login.module').then(mod => mod.LoginModule)
    },
    {
        path: 'register',
        component: RegisterComponent,
        loadChildren: () => import('./components/user-access/register/register.module').then(mod => mod.RegisterModule)
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () => import('./components/dashboard/dashboard.module').then(mod => mod.DashboardModule),
        canActivate: [AuthGuard]
    },
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
