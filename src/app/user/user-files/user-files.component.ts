import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatLine} from "@angular/material/core";
import {MatDividerModule} from '@angular/material/divider';
import {DatePipe} from '@angular/common';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-user-files',
  standalone: true,
  imports: [CommonModule,MatDividerModule, MatTabsModule, MatIconModule, MatButtonModule, MatListModule, MatLine],
  templateUrl: './user-files.component.html',
  styleUrl: './user-files.component.css'
})
export class UserFilesComponent {
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  // Track By Function
  trackByFolder(index: number, folder: any): number {
    return folder.id; // Track by unique identifier (e.g., id)
  }
// Mock data for files
  recentFiles = [
    { id: 1, name: 'Project Plan.pdf', lastAccessed: new Date(), permissions: ['view', 'download'] },
    { id: 2, name: 'Budget.xlsx', lastAccessed: new Date(new Date().setDate(new Date().getDate() - 1)), permissions: ['view', 'delete'] }
  ];

  departmentFiles = [
    { id: 3, name: 'Team Guidelines.docx', owner: 'Alice', permissions: ['view', 'download', 'delete'] },
    { id: 4, name: 'Monthly Report.pdf', owner: 'Bob', permissions: ['view'] }
  ];

  otherDepartmentFiles = [
    { id: 5, name: 'Company Policies.pdf', department: 'HR', permissions: ['view'] },
    { id: 6, name: 'Annual Report.pdf', department: 'Finance', permissions: ['view', 'download'] }
  ];

  // View file action
  viewFile(file: any): void {
    if (file.permissions.includes('view')) {
      console.log(`Viewing file: ${file.name}`);
      // Implement file viewing logic here (e.g., opening a modal or redirecting to a viewer page)
    } else {
      alert('You do not have permission to view this file.');
    }
  }

  // Download file action
  downloadFile(file: any): void {
    if (file.permissions.includes('download')) {
      console.log(`Downloading file: ${file.name}`);
      // Implement file download logic here (e.g., generating a download link or API call)
    } else {
      alert('You do not have permission to download this file.');
    }
  }

  // Delete file action
  deleteFile(file: any): void {
    if (file.permissions.includes('delete')) {
      if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
        console.log(`Deleting file: ${file.name}`);
        // Implement file deletion logic here (e.g., API call to delete file)
      }
    } else {
      alert('You do not have permission to delete this file.');
    }
  }
}
