import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bug} from '../../../../models/bug';
import {UserService} from '../../../../shared/user.service';
import {map, Observable} from 'rxjs';
import {User} from '../../../../models/user';


export interface BugData {
    bug?: Bug;
    title: string;
}

@Component({
    selector: 'app-bug',
    templateUrl: './bug.component.html',
    styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

    form!: FormGroup;

    users$!: Observable<User[]>;

    readonly maxTitleLength = 100;
    readonly maxDescriptionLength = 500;


    // ------------------------------------------------------------------------------------

    constructor(private readonly dialogRef: MatDialogRef<BugComponent>,
                private readonly formBuilder: FormBuilder,
                private readonly userService: UserService,
                @Inject(MAT_DIALOG_DATA) public readonly data: BugData) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: [this.bug?.title, [Validators.required, Validators.maxLength(this.maxTitleLength)]],
            description: [this.bug?.description, [Validators.maxLength(this.maxDescriptionLength)]],
            assignedTo: [this.bug?.userId]
        });

        this.loadData();
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    onSubmit(): void {
        if (!this.form.valid) {
            return;
        }

        const bug: Bug = {
            id: this.bug?.id,
            title: this.title?.value,
            description: this.description?.value,
            trackId: this.bug?.trackId,
            userId: this.assignedTo?.value
        }

        this.dialogRef.close(bug);
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    getMaxCharLabel(maxChar: number): string {
        return `Máx ${maxChar} caracteres`;
    }

    getCharCount(control: AbstractControl, maxChar: number): string {
        return `${control?.value?.length || 0}/${maxChar}`;
    }

    get titleErrorMsg(): string {
        if (this.title?.hasError('required')) {
            return 'O título é obrigatório.'
        } else if (this.title?.hasError('maxlength')) {
            return `O título deve ter no máximo ${this.maxTitleLength} caracteres.`
        }

        return '';
    }

    get descriptionErrorMsg(): string {
        if (this.description?.hasError('maxlength')) {
            return `A descrição deve ter no máximo ${this.maxDescriptionLength} caracteres.`
        }

        return '';
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    private loadData(): void {
        this.users$ = this.userService.getAll()
            .pipe(map(items => items.filter(item => item.id !== 1)));       // 1 = Admin
    }

    // ------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------

    get bug(): Bug {
        return <Bug>this.data?.bug;
    }

    get title(): AbstractControl {
        return <AbstractControl>this.form.get('title');
    }

    get description(): AbstractControl {
        return <AbstractControl>this.form.get('description');
    }

    get assignedTo(): AbstractControl {
        return <AbstractControl>this.form.get('assignedTo');
    }

    // ------------------------------------------------------------------------------------

}
