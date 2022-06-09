import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bug} from '../../../../models/bug';

@Component({
    selector: 'app-bug',
    templateUrl: './bug.component.html',
    styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

    formBug: FormGroup = new FormGroup({});

    constructor(
        public dialogRef: MatDialogRef<BugComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Bug,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.formBug = this.fb.group({
            title: [this.data && this.data.title ? this.data.title : null, Validators.required],
            description: [this.data && this.data.description ? this.data.description : null, Validators.required],
            assignedTo: [this.data && this.data.userId ? this.data.userId : null]
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(this.formBug.value);
    }

}
