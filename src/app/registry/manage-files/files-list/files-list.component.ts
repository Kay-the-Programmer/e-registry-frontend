import { Component, OnInit } from '@angular/core';
import { FileService } from "../../../services/file-service/file.service";
import { File } from "../../../models/file.model";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from "@angular/material/icon";
import {MatSnackBarModule, MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogModule, MatDialog} from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import {DeleteFileConfirmationComponent} from "../delete-file-confirmation/delete-file-confirmation.component";
import {EditFileDialogComponent} from "../edit-file-dialog/edit-file-dialog.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-files-list',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIcon],
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],

})
export class FilesListComponent implements OnInit {
  files: File[] = [];
  departmentMap: { [key: number]: string } = {};
  departments: any[] = [];

  dataSource = new MatTableDataSource<File>(this.files);
  displayedColumns: string[] = ['fileNo', 'fileTitle', 'fileSubject', 'department', 'actions', ];

  constructor(private fileService: FileService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private http: HttpClient,
              private router: Router,

              ) {}

  ngOnInit(): void {
    this.getFileList();
    this.fetchDepartments();

  }

  getFileList() {
    this.fileService.getAllFiles().subscribe({
      next: (data) => {
        this.files = data;
        this.dataSource.data = this.files; // Update the dataSource with the fetched data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  fetchDepartments() {
    this.http.get<any[]>('http://localhost:3000/dept/getAllDepartments').subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        this.snackBar.open('Failed to fetch departments.', 'Close', { duration: 3000 });
        console.error('Error fetching departments:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  performAction(element: any) {

  }


  editFile(file: File): void {
    const dialogRef = this.dialog.open(EditFileDialogComponent, {
      width: '500px',
      data: { file, departments: this.departments } // Pass file and department data to the dialog
    });
    console.log("Initial File", file)

    dialogRef.afterClosed().subscribe((updatedFile) => {
      if (updatedFile) {
        // Update the file in the dataSource
        const fileIndex = this.files.findIndex((f) => f.fileNo === file.fileNo);
        if (fileIndex > -1) {
          this.files[fileIndex] = { ...this.files[fileIndex], ...updatedFile };
          this.dataSource.data = [...this.files]; // Update the dataSource
        }
        // Optionally, send the updated file to the server
        this.fileService.updateFile(file.fileNo, updatedFile).subscribe(
          {
            next: () => {
              this.snackBar.open('File updated successfully.', 'Close', { duration: 3000 });
            },
            error: () => {
              this.snackBar.open('Failed to update file.', 'Close', { duration: 3000 });
            }
          });
      }
    });
  }

  deleteFile(fileId: string): void {
    const dialogRef = this.dialog.open(DeleteFileConfirmationComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this file? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.fileService.deleteFile(fileId).subscribe({
          next: () => {
            this.files = this.files.filter(file => file.fileNo !== fileId);
            this.dataSource.data = [...this.files]; // Refresh the table
            this.snackBar.open('File deleted successfully.', 'Close', { duration: 3000 });
          },
          error: (err) => {
            const errorMessage =
              err.status === 500
                ? 'An error occurred on the server. Please try again later.'
                : err.error?.message || 'Failed to delete file.';
            this.snackBar.open(errorMessage, 'Close', { duration: 10000 });
          },
        });
      }
    });
  }


  openFile(fileNo: string) {
    this.fileService.getFileById(fileNo).subscribe({
      next: () => {
        this.router.navigate(['/registry/file-details', fileNo]);
      },
      error: () => {
        this.snackBar.open('Failed to open file.', 'Close', { duration: 1000 });
      }
    });
  }
}
