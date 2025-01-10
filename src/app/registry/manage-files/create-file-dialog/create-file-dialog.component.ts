import {Component, OnInit, EventEmitter, Output, } from '@angular/core';
import {MatDialogRef, MatDialogTitle, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import { FileService} from "../../../services/file-service/file.service";
import {Department} from "../../../models/department.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-file-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInput, MatDialogTitle, MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './create-file-dialog.component.html',
  styleUrl: './create-file-dialog.component.css',

})
export class CreateFileDialogComponent implements OnInit {
  createFileForm: FormGroup;
  d=false;
  departments: Department[] = [];

  @Output() fileCreated = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFileDialogComponent>,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
  ) {
    this.createFileForm = this.fb.group({
      fileTitle: ['', Validators.required],
      fileSubject: ['', Validators.required],
      departmentId: ['', Validators.required],
      fileNo: ['', Validators.required],
    });
  }

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
      const fileData = {
        ...this.createFileForm.value,
        id: this.createFileForm.value.fileNo, // Use `fileNo` to initialize `id`
      };

      this.http.post('http://localhost:3000/files/create-file', fileData).subscribe({
        next: (response) => {
          this.snackBar.open('File created successfully', 'Close', { duration: 3000,
            horizontalPosition: 'left', verticalPosition: 'bottom'
          });
          this.fileCreated.emit(response);
        },
        error: (error) => {
          this.snackBar.open(`Error creating file. ${{error}}`);
        },
        complete: () => {
          this.dialogRef.close();
        }
      })
    } else {
      this.snackBar.open('Invalid file data', 'Close', { duration: 3000,
      horizontalPosition: 'left', verticalPosition: 'bottom'});
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
