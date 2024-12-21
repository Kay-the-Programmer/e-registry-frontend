import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfile } from '../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../auth/auth.service';
import {MatInputModule} from '@angular/material/input';
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../models/department.model";
import {FileService} from "../../services/file-service/file.service";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from "@angular/material/card";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleUp, faExclamationCircle, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FaIconComponent,
    MatTooltip,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: UserProfile | null = null; // User data will be fetched from the backend
  isLoading = true; // Start with the loader as true
  showPassword: boolean = false; // For password visibility toggle
  passwordResetForm: FormGroup; // Form to reset password
  departmentMap: { [key: number]: string } = {};
  toggled = false;
  showUpArrow(){
    this.toggled = !this.toggled;
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private fileService: FileService,
  ) {
    // Initialize the password reset form
    this.passwordResetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUserProfile();
    this.fileService.getAllDepartments().subscribe((departments) => {
      departments.forEach(department => {
        this.departmentMap[department.id] = department.departmentName;
      });
    });
  }

  // Function to fetch user details from the backend
  fetchUserProfile(): void {
    // Retrieve token from localStorage or sessionStorage
    const userToken = sessionStorage.getItem('authToken'); // Or use localStorage.getItem('authToken') if stored there
    if (userToken) {
      // Decode the token to extract the user's email (assuming the email is stored in the token)
      const decodedToken = JSON.parse(atob(userToken.split('.')[1])); // Decode JWT token
      const userEmail = decodedToken.email; // Assuming the email is stored in the token payload
      console.log(decodedToken)

      // Making the HTTP request with the token in the Authorization header and user email
      this.http.get<UserProfile>(`http://localhost:3000/auth/getUserByEmail${userEmail}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${userToken}`,
        }),
      }).subscribe({
        next: (data) => {
          this.user = data; // Assign the fetched user data
          this.isLoading = false; // Hide loading spinner
          console.log(this.user);
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
          this.snackBar.open('Failed to load user profile. Please try again later.', 'Close', {
            duration: 3000,
          });
          this.isLoading = false; // Hide loading spinner
        },
      });
    } else {
      this.snackBar.open('You are not logged in. Please log in first.', 'Close', {
        duration: 3000,
      });
      this.isLoading = false; // Hide loading spinner
    }
  }
  // Function to handle password visibility toggle
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Function to handle password reset
  resetPassword(): void {
    if (this.passwordResetForm.valid) {
      const { newPassword, confirmPassword } = this.passwordResetForm.value;
      if (newPassword !== confirmPassword) {
        this.snackBar.open('Passwords do not match. Please try again.', 'Close', { duration: 3000 });
        return;
      }

      // Send a password reset request to the backend
      this.http.patch('http://localhost:3000/auth/resetPassword', { email: this.user?.email, password: newPassword }).subscribe({
        next: () => {
          this.snackBar.open('Password reset successful!', 'Ok', { duration: 3000 });
          this.passwordResetForm.reset();
        },
        error: (error) => {
          console.error('Error resetting password:', error);
          this.snackBar.open('Failed to reset password. Please try again.', 'Close', { duration: 3000 });
        },
      });

    } else {
      this.snackBar.open('Please enter a valid password.', 'Close', { duration: 3000 });
    }
  }

  getDepartmentName(departmentId: number): string {
    return this.departmentMap[departmentId] || 'Loading...';
  }

  protected readonly faUserCircle = faUserCircle;
  protected readonly faAngleUp = faAngleUp;
  protected readonly faExclamationCircle = faExclamationCircle;
}
