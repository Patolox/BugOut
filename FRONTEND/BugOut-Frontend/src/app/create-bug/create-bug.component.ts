import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bug } from '../models/bug';
import { Talk } from '../models/schema.model';

@Component({
    selector: 'app-create-bug',
    templateUrl: './create-bug.component.html',
    styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent implements OnInit {

    formBug: FormGroup = new FormGroup({});
    constructor(
        public dialogRef: MatDialogRef<CreateBugComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Bug,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.formBug = this.fb.group({
            title: [this.data && this.data.title ? this.data.title : null, Validators.required],
            description: [this.data && this.data.description ? this.data.description : null, Validators.required],
            assignedTo: [this.data && this.data.assignedTo ? this.data.assignedTo : null]
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    onSubmit(){
        this.dialogRef.close(this.formBug.value);
    }

}
