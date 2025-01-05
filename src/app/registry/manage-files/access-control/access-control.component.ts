import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe, NgForOf} from '@angular/common';
import {MatInput} from "@angular/material/input";

interface File {
  id: string;
  name: string;
  owner?: string;
  accessLevel?: string;
}

interface AccessLog {
  fileId: string;
  userId: string;
  action: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  role: string;
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
    MatInput
  ],
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {
  accessForm: FormGroup;
  files: File[] = [
    { id: '1', name: 'Document 1' },
    { id: '2', name: 'Document 2' },
  ];
  users: User[] = [
    { id: 'u1', name: 'User 1', role: 'Viewer' },
    { id: 'u2', name: 'User 2', role: 'Editor' },
  ];
  logs: AccessLog[] = [];
  displayedColumns: string[] = ['fileId', 'userId', 'action', 'timestamp', 'actions'];
  dataSource = new MatTableDataSource<AccessLog>(this.logs);

  constructor(private fb: FormBuilder) {
    this.accessForm = this.fb.group({
      fileId: [''],
      userId: [''],
      accessLevel: [''],
    });
  }

  ngOnInit(): void {}

  assignAccess() {
    const { fileId, userId, accessLevel } = this.accessForm.value;
    const action = `Assigned ${accessLevel}`;
    const timestamp = new Date();

    // Log the action
    this.logs.push({ fileId, userId, action, timestamp });
    this.dataSource.data = this.logs;

    alert(`Access '${accessLevel}' assigned successfully!`);
    this.accessForm.reset();
  }

  revokeAccess(fileId: string, userId: string) {
    this.logs = this.logs.filter(log => !(log.fileId === fileId && log.userId === userId));
    this.dataSource.data = this.logs;

    alert('Access revoked successfully!');
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
}
