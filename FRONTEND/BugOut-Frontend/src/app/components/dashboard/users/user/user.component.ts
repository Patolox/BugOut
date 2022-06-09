import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      username: [this.data && this.data.username ? this.data.username : null, Validators.required],
      email: [this.data && this.data.email ? this.data.email : null, Validators.required],
      password: [this.data && this.data.password ? this.data.password : null, Validators.required]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit(){
      this.dialogRef.close(this.formUser.value);
  }
}
