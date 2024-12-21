import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-edit-file-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit-file-dialog.component.html',
  styleUrl: './edit-file-dialog.component.css'
})
export class EditFileDialogComponent {
  editFileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Data passed from the ManageFilesComponent
  ) {
    // Initialize the form with pre-filled values
    this.editFileForm = this.fb.group({
      id: [{ value: data.file.fileNo, disabled: true }, Validators.required],
      fileNo: [{ value: data.file.fileNo, disabled: true }, Validators.required],
      fileTitle: [data.file.fileTitle, Validators.required],
      fileSubject: [data.file.fileSubject, Validators.required],
      departmentId: [data.file.departmentId, Validators.required]
    });
  }

  // Handle form submission
  onSave(): void {
    if (this.editFileForm.valid) {
      this.dialogRef.close(this.editFileForm.value); // Pass updated file details back to the caller
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without saving changes
  }

}
