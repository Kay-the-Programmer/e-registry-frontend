import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    HttpClientModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  buttonStatus: string = 'Save';
  isSubmitting: boolean = false;
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this.userForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      departmentId: ['', Validators.required],
      empNumber: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.userForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      position: ['', Validators.required],
      empNumber: ['', Validators.required],
      departmentId: [null, Validators.required]  // Bind to department ID dropdown
    });

    this.loadDepartments();  // Load departments on component initialization
  }

  loadDepartments() {
    // Fetch departments from the backend endpoint
    this.http.get<any[]>('http://localhost:3000/dept/getAllDepartments').subscribe(
      (data) => {
        this.departments = data;  // Store departments in the component
        console.log(this.departments)
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  // Function to handle form submission
  onSave(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const userData = this.userForm.value;
      this.buttonStatus = "Creating user...";

      // Send POST request to API
      this.http.post('http://localhost:3000/auth/signUp', userData).subscribe({
        next: (response) => {
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(); // Close dialog on success
          this.buttonStatus = "Create user";
          this.isSubmitting = false;

          // Refresh the page
          location.reload();
        },

        error: (error) => {
          this.snackBar.open('Error creating user. Please try again.', 'Close', { duration: 3000 });
          console.error('Error response:', error);
          this.buttonStatus = "Create user";
          this.isSubmitting = false;

        },
        complete: () => {
          this.isSubmitting = false;
          this.buttonStatus = "Create user";
        },
      });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
    }
  }

  // Function to handle cancel action
  onCancel(): void {
    this.dialogRef.close();
  }
}
