import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,  // Mark as standalone
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule]  // Import required Angular Material modules
})
export class EditUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Accept the user data to populate the form
  ) {
    // Initialize the form group and pre-fill with user data
    this.userForm = this.fb.group({
      fName: [this.data.user.fName, [Validators.required]],
      lName: [this.data.user.lName, [Validators.required]],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      role: [this.data.user.role, [Validators.required]],
      position: [this.data.user.position, [Validators.required]],
      empNumber: [this.data.user.empNumber, [Validators.required]],
      departmentId: [this.data.user.departmentId, [Validators.required]]
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);  // Close dialog and return updated data
    }
  }

  onCancel(): void {
    this.dialogRef.close();  // Close dialog without any action
  }
}
