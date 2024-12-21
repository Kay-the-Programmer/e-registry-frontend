import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Sign in a user with email and password
   * @param email - The user's email
   * @param password - The user's password
   * @returns An Observable of the API response
   */
  signIn(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}auth/signIn`, payload).pipe(
      map((response: any) => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
          // Fetch user by email after successful login and handle redirection
          this.fetchUserByEmail(email).subscribe((user) => {
            this.handleRoleBasedRedirection(user.role);
          });
        }
        return response;
      })
    );
  }

  /**
   * Fetch a user by their email
   * @param email - The user's email
   * @returns An Observable of the user data
   */
  fetchUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}auth/getUserByEmail/${email}`);
  }

  /**
   * Handle redirection based on user role
   * @param role - The user's role
   */
  private handleRoleBasedRedirection(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/user/dashboard/home']);
        break;
      case 'user':
        this.router.navigate(['/registry/dashboard/registry-dashboard']);
        break;
      default:
        this.router.navigate(['/unauthorized']);
    }
  }

  // Method to get the current logged-in user data
  getCurrentUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Method to get the authentication token
  getAuthToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  // Method to log out the user
  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  }
}
