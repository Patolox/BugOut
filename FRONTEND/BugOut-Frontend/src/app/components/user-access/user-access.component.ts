import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

export interface UserAccessConfig {
    title: string;
    mainBtn: string;
    secondBtn: string;
}

@Component({
    selector: 'app-user-access',
    templateUrl: './user-access.component.html',
    styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {

    @Input() mode!: 'login' | 'register';
    @Input() user?: User;
    @Input() config!: UserAccessConfig;
    @Input() loading!: boolean;

    @Output() mainButton = new EventEmitter<User>();
    @Output() secondButton = new EventEmitter<void>();

    form!: FormGroup;

    readonly maxUsernameLength = 30;
    readonly maxEmailLength = 50;
    readonly minPasswordLength = 8;
    readonly maxPasswordLength = 100;


    // ------------------------------------------------------------------------------------

    constructor(private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: [this.user?.username, [Validators.required, Validators.maxLength(this.maxUsernameLength)]],
            email: [this.user?.email, [Validators.required, Validators.email, Validators.maxLength(this.maxEmailLength)]],
            password: [this.user?.password, [Validators.required, Validators.minLength(this.minPasswordLength), Validators.maxLength(this.maxPasswordLength)]]
        });

        if (!this.canShowEmail) {
            this.email?.disable();
        }
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    onSecondButtonPress(): void {
        this.secondButton.emit();
    }

    onMainButtonPress(): void {
        if (!this.form.valid) {
            return;
        }

        const user: User = {
            id: this.user?.id,
            username: this.username?.value,
            email: this.email?.value,
            password: this.password?.value
        };

        this.mainButton.emit(user);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    get canShowEmail(): boolean {
        return !this.isLoginMode;
    }

    get canAutoComplete(): string {
        return this.isLoginMode ? 'on' : 'off';
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    getMaxCharLabel(maxChar: number): string {
        return `Máx ${maxChar} caracteres`;
    }

    getCharCount(control: AbstractControl, maxChar: number): string {
        return `${control?.value?.length || 0}/${maxChar}`;
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

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    get isLoginMode(): boolean {
        return this.mode === 'login';
    }

    // -------------------

    get username(): AbstractControl {
        return <AbstractControl>this.form.get('username');
    }

    get email(): AbstractControl {
        return <AbstractControl>this.form.get('email');
    }

    get password(): AbstractControl {
        return <AbstractControl>this.form.get('password');
    }

    // ------------------------------------------------------------------------------------

}

