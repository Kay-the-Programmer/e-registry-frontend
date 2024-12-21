import { MatCardModule } from '@angular/material/card';
import {NgOptimizedImage} from "@angular/common";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage, MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatProgressBarModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage = '';
  isProgressBarVisible = false;
  showDynamicContent = false;
  hide = true;

  signInForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  buttonStatus = 'Login'
  isLoading: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef,
              // private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              private http: HttpClient,
              )  {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  togglePasswordVisibility(){
    this.hide = !this.hide;
  }

  // Updated onSignIn method in AuthComponent
  onSignIn() {
    if (this.email.valid && this.password.valid) {
      this.isProgressBarVisible = true;
      this.buttonStatus = 'Logging in...';
      this.isLoading = true;
      this.isProgressBarVisible = true;

      const email = this.email.value!;
      const password = this.password.value!;
      const signInUrl = 'http://localhost:3000/auth/signIn'; // Replace with your actual API endpoint

      this.http.post(signInUrl, { email, password }, { responseType: 'text' }).subscribe({
        next: (token: string) => {
          this.isProgressBarVisible = false;
          this.snackBar.open('Sign-in successful!', 'Close', { duration: 3000 });

          // Save the token to sessionStorage
          sessionStorage.setItem('authToken', token);

          // Decode JWT and store the user details
          const user = this.decodeJwt(token);
          sessionStorage.setItem('user', JSON.stringify(user));

          // Redirect based on the user role
          this.redirectBasedOnRole(token);

          this.changeDetector.detectChanges();
        },
        error: (error) => {
          this.isProgressBarVisible = false;
          this.snackBar.open('Sign-in failed. Please try again.', 'Close', { duration: 3000 });
          console.error('Sign-in error:', error);
          this.buttonStatus = 'Login';
          this.isLoading = false;
          this.changeDetector.detectChanges();
        },
      });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
    }
  }

  private redirectBasedOnRole(token: string) {
    // Example logic to decode the JWT token and fetch the role
    const decodedToken = this.decodeJwt(token);
    const role = decodedToken.role;


    switch (role) {
      case 'admin':
        this.router.navigate(['/registry/dashboard/registry-dashboard']);
        break;
      case 'Admin':
        this.router.navigate(['/registry/dashboard/registry-dashboard']);
        break;
      case 'user':
        this.router.navigate(['/user/dashboard/home']);
        break;
      case 'User':
        this.router.navigate(['/user/dashboard/home']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }


  // onSignIn() {
  //   if (this.email.valid && this.password.valid) {
  //     this.buttonStatus = 'Logging in...';
  //     this.isLoading = true;
  //     this.isProgressBarVisible = true;
  //
  //     const email = this.email.value!;
  //     const password = this.password.value!;
  //     const signInUrl = 'http://localhost:3000/auth/signIn';
  //
  //     this.http.post(signInUrl, { email, password }, { responseType: 'json' }).subscribe({
  //       next: (response: any) => {
  //         this.isProgressBarVisible = false;
  //         this.snackBar.open('Sign-in successful!', 'Close', { duration: 3000 });
  //
  //         // Save the token to localStorage or sessionStorage
  //         sessionStorage.setItem('authToken', response.token);
  //
  //         // Check the user's role and redirect accordingly
  //         this.redirectBasedOnRole(response.role);
  //
  //         this.changeDetector.detectChanges();
  //       },
  //       error: (error) => {
  //         this.isProgressBarVisible = false;
  //         this.snackBar.open('Sign-in failed. Please try again.', 'Close', { duration: 3000 });
  //         console.error('Sign-in error:', error);
  //         this.buttonStatus = 'Login'
  //         this.isLoading = false;
  //         this.changeDetector.detectChanges();
  //       },
  //     });
  //   } else {
  //     this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
  //   }
  // }
  //
  // private redirectBasedOnRole(role: string) {
  //   switch (role) {
  //     case 'user':
  //       this.router.navigate(['/user/dashboard/home']);
  //       break;
  //     case 'admin':
  //       this.router.navigate(['/registry/dashboard/registry-dashboard']);
  //       break;
  //     default:
  //       this.router.navigate(['/']);
  //       break;
  //   }
  // }


  // onSignIn() {
  //   if (this.email.valid && this.password.valid) {
  //     this.isProgressBarVisible = true;
  //
  //     const email = this.email.value!;
  //     const password = this.password.value!;
  //     const signInUrl = 'http://localhost:3000/auth/signIn'; // Replace with your actual API endpoint
  //
  //     this.http.post(signInUrl, { email, password }, { responseType: 'text' }).subscribe({
  //       next: (token: string) => {
  //         this.isProgressBarVisible = false;
  //         this.snackBar.open('Sign-in successful!', 'Close', { duration: 3000 });
  //
  //         // Save the token to localStorage or sessionStorage
  //         sessionStorage.setItem('authToken', token);
  //         console.log(token)
  //         // Navigate to the dashboard
  //         this.router.navigate(['/registry/dashboard/registry-dashboard']);
  //         this.changeDetector.detectChanges();
  //       },
  //       error: (error) => {
  //         this.isProgressBarVisible = false;
  //         this.snackBar.open('Sign-in failed. Please try again.', 'Close', { duration: 3000 });
  //         console.error('Sign-in error:', error);
  //         this.changeDetector.detectChanges();
  //       },
  //     });
  //   } else {
  //     this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
  //   }
  // }

  resetContent() {
    this.showDynamicContent = false;
  }

}
