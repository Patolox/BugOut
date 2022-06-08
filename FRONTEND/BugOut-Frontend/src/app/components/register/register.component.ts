import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from '../../util/auth/token.service';
import {LoginService} from '../../shared/login.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../shared/user.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form!: FormGroup;

    loading!: boolean;

    private readonly subscriptions: Subscription[] = [];


    constructor(private readonly formBuilder: FormBuilder,
                private readonly router: Router,
                private readonly tokenStorage: TokenService,
                private readonly loginService: LoginService,
                private readonly toastrService: ToastrService,
                private readonly userService: UserService) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }


    cancel(): void {
        this.gotoLoginPage();
    }

    register(): void {
        if (!this.form.valid) {
            return;
        }

        this.loading = true;

        const user: User = {
            username: this.username?.value,
            email: this.email?.value,
            password: this.password?.value
        };

        const subscription = this.userService.create(user).subscribe({
            next: _ => {
                this.toastrService.success('Registro feito com sucesso!');
                this.gotoLoginPage();
            },
            error: (error: HttpErrorResponse) =>
                this.toastrService.error(error.error?.exception || 'Ocorreu um erro ao tentar fazer o registro, tente novemente mais tarde.'),
        });
        subscription.add(() => this.loading = false)

        this.subscriptions.push(subscription);
    }


    private gotoLoginPage(): void {
        this.router.navigate(['/']).then();
    }


    get usernameErrorMsg(): string {
        if (this.username?.hasError('required')) {
            return 'O nome do usuário é obrigatório.'
        } else if (this.username?.hasError('maxlength')) {
            return 'O nome do usuário deve ter no máximo 30 caracteres.'
        }

        return '';
    }

    get emailErrorMsg(): string {
        if (this.email?.hasError('required')) {
            return 'O email é obrigatório.'
        } else if (this.email?.hasError('email')) {
            return 'O email está fora do padrão.'
        } else if (this.email?.hasError('maxlength')) {
            return 'O email deve ter no máximo 50 caracteres.'
        }

        return '';
    }

    get passwordErrorMsg(): string {
        if (this.password?.hasError('required')) {
            return 'A senha é obrigatória.'
        } else if (this.password?.hasError('minlength')) {
            return 'A senha deve ter no mínimo 8 caracteres.'
        } else if (this.password?.hasError('maxlength')) {
            return 'A senha deve ter no máximo 100 caracteres.'
        }

        return '';
    }


    get username(): AbstractControl | null {
        return this.form.get('username');
    }

    get email(): AbstractControl | null {
        return this.form.get('email');
    }

    get password(): AbstractControl | null {
        return this.form.get('password');
    }

}
