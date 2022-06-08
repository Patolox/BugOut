import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../util/auth/token-storage.service';
import {LoginService} from './login.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    form!: FormGroup;

    loading!: boolean;

    private readonly subscriptions: Subscription[] = [];


    constructor(private readonly formBuilder: FormBuilder,
                private readonly router: Router,
                private readonly tokenStorage: TokenStorageService,
                private readonly loginService: LoginService,
                private readonly toastrService: ToastrService) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(30)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }


    login(): void {
        this.loading = true;

        const subscription = this.loginService.login(this.username?.value, this.password?.value).subscribe({
            next: user => {
                this.tokenStorage.saveToken(user.token);
                this.tokenStorage.saveUser(user);

                this.router.navigate(['/dashboard']).then();
            }, error: (error: HttpErrorResponse) =>
                this.toastrService.error(error.message || 'Ocorreu um erro ao tentar fazer o login, tente novemente mais tarde.'),
        });
        subscription.add(() => this.loading = false)

        this.subscriptions.push(subscription);
    }

    get usernameErrorMsg(): string {
        if (this.username?.hasError('required')) {
            return 'O nome do usuário é obrigatório.'
        } else if (this.username?.hasError('maxlength')) {
            return 'O nome do usuário deve ter no máximo 30 caracteres'
        }

        return '';
    }

    get passwordErrorMsg(): string {
        if (this.password?.hasError('required')) {
            return 'A senha é obrigatória.'
        } else if (this.password?.hasError('minlength')) {
            return 'A senha deve ter no mínimo 8 caracteres'
        } else if (this.password?.hasError('maxlength')) {
            return 'A senha deve ter no máximo 100 caracteres'
        }

        return '';
    }


    get username(): AbstractControl | null {
        return this.form.get('username');
    }

    get password(): AbstractControl | null {
        return this.form.get('password');
    }

}
