import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent} from "./create-user/create-user.component";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbar } from "@angular/material/toolbar";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule, MatButtonModule, MatToolbar, MatTableModule, MatIconModule,
    MatPaginator, ConfirmationDialogComponent, EditUserDialogComponent,
    MatSortModule, FaIconComponent,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit{

  displayedColumns: string[] = [
    'empNumber',
    'fName',
    'lName',
    'email',
    'role',
    'userDept',
    'actions',
  ];

  departments: any[] = [];
  users: any[] = [];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchDepartments()
  }

  fetchDepartments() {
    this.http.get<any[]>('http://localhost:3000/dept/getAllDepartments').subscribe({
      next: (data) => {
        this.departments = data;
        this.fetchUsers(); // Fetch users after departments are fetched
      },
      error: (err) => {
        this.snackBar.open('Failed to fetch departments.', 'Close', { duration: 3000 });
        console.error('Error fetching departments:', err);
      }
    });
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/auth/getAllUsers').subscribe({
      next: (users) => {
        this.users = users;

        // Loop through each user and find the department name
        this.users.forEach(user => {
          const department = this.departments.find(dep => dep.id === user.departmentId);
          user.departmentName = department ? department.name : 'Unknown';  // Set department name
        });

        // Set data source
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.snackBar.open('Failed to fetch users', 'Refresh', { duration: 3000 });
        console.error('Error fetching users:', error);
      }
    });
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.userCreated.subscribe((newUser) => {
      this.users.push(newUser); // Add the new user to the array
      this.dataSource.data = this.users; // Update the table data source
      this.snackBar.open('User added to the list!', 'Close', { duration: 3000,
      horizontalPosition: 'left', verticalPosition:'bottom'});
    });
  }

  deleteUserWithConfirmation(user: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { title: 'Confirm user deletion', message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteUser(user);  // Proceed to delete user if confirmed
      }
    });
  }

  deleteUser(user: any): void {
    this.http.delete(`http://localhost:3000/auth/deleteAccount${user.id}`).subscribe({
      next: () => {
        this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
        this.fetchUsers(); // Refresh the list of users
      },
      error: () => {
        this.snackBar.open('Failed to delete user.', 'Close', { duration: 3000 });
      }
    });
  }

  // Open the Edit User dialog
  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: { user }  // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(result);  // Proceed to update the user if data was returned
      }
    });
  }

  // Update the user details
  updateUser(updatedUser: any): void {
    this.http.put(`http://localhost:3000/auth/updateAccount/${updatedUser.empNumber}`, updatedUser).subscribe({
      next: () => {
        this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        this.fetchUsers();  // Refresh the list of users
      },
      error: () => {
        this.snackBar.open('Failed to update user.', 'Close', { duration: 3000 });
      }
    });
  }

  protected readonly faUserCheck = faUserCheck;
  protected readonly faUserPlus = faUserPlus;
}
