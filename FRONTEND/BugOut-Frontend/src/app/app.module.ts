import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {authInterceptorProviders} from './util/auth/auth.interceptor';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {ErrorsHandler} from './util/errors-handler';
import {AuthGuard} from './util/auth/auth.guard';
import { UserAccessComponent } from './components/user-access/user-access.component';


@NgModule({
    declarations: [
        AppComponent,
        UserAccessComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        AppRoutingModule,
        MatMenuModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        DragDropModule,
        MatDialogModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: ErrorsHandler
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'pt-BR'
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR'
        },
        authInterceptorProviders,
        ToastrService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
