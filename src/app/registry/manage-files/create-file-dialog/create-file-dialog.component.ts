import {Component, OnInit} from '@angular/core';
import { ComponentRef } from '@angular/core';
import {MatDialogRef, MatDialogTitle, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import { FileService} from "../../../services/file-service/file.service";
import {Department} from "../../../models/department.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-file-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInput, MatDialogTitle, MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './create-file-dialog.component.html',
  styleUrl: './create-file-dialog.component.css'
})
export class CreateFileDialogComponent implements OnInit {
  createFileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFileDialogComponent>,
    private fileService: FileService,
    private snackBar: MatSnackBar,
  ) {
    this.createFileForm = this.fb.group({
      fileTitle: ['', Validators.required],
      fileSubject: ['', Validators.required],
      departmentId: ['', Validators.required],
      fileNo: ['', Validators.required],
      id: ['', Validators.required],
    });
  }
  d=false;
  departments: Department[] = [];

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.fileService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    })
  }

  onSave(): void {
    if (this.createFileForm.valid) {
      const fileData = this.createFileForm.value;

      console.log('Submitting File Data:', fileData); // Log the submitted data

      this.fileService.createFile(fileData).subscribe({
        next: (createdFile) => {
          this.snackBar.open('File created successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(createdFile);
        },
        error: (err) => {
          console.error('Error creating file:', err);

          const serverErrors = err.error?.message || 'Unknown error occurred';
          this.snackBar.open(`Failed to create file: ${serverErrors}`, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
