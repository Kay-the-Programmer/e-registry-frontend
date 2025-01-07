import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe, NgForOf} from '@angular/common';
import {MatInput} from "@angular/material/input";
import {File} from '../../../models/file.model';
import {FileService} from "../../../services/file-service/file.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../services/user.service";
import {UserProfile} from "../../../models/user.model";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {MatCard, MatCardModule} from "@angular/material/card";

interface AccessLog {
  fileId: string;
  userId: string;
  timestamp: Date;
}

@Component({
  selector: 'app-access-control',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    NgForOf,
    DatePipe,
    MatInput,
    FaIconComponent,
    MatCardModule
  ],
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {
  accessForm: FormGroup;
  files: File[] = [];
  users: UserProfile[] = [];
  logs: AccessLog[] = [];
  displayedColumns: string[] = ['fileId', 'userId', 'actions'];
  dataSource = new MatTableDataSource<AccessLog>(this.logs);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private fileService: FileService,
    private userService: UserService,
    ) {
    this.accessForm = this.fb.group({
      fileId: [''],
      userId: [''],
    });
  }

  ngOnInit(): void {
    this.getFiles();
    this.getUsers();
  }

  assignAccess() {
    const { fileId, userId } = this.accessForm.value;
    const timestamp = new Date();

    // Log the action
    this.logs.push({ fileId, userId, timestamp });
    this.dataSource.data = this.logs;
    this.snackBar.open('Access authorised successfully!', 'Close', { duration: 3000 });
    this.accessForm.reset();
  }

  revokeAccess(fileId: string, userId: string) {
    this.logs = this.logs.filter(log => !(log.fileId === fileId && log.userId === userId));
    this.dataSource.data = this.logs;
    this.snackBar.open('Access revoked successfully!', 'Close', { duration: 3000 });
  }

  checkAccess(userId: string, fileId: string): boolean {
    return this.logs.some(log => log.userId === userId && log.fileId === fileId);
  }

  generateReport() {
    console.table(this.logs);
    alert('Access report generated. Check the console for details.');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFiles(){
    this.fileService.getAllFiles().subscribe({
      next: (files) => {
        this.files = files;
      },
      error: (error: Error) => {
        console.log(error);
      }
    })
  }

  getUsers(){
    this.userService.fetchUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error: Error) => {
        console.log(error);
      }
    })
  }

  protected readonly faLock = faLock;
  protected readonly faLockOpen = faLockOpen;
}
