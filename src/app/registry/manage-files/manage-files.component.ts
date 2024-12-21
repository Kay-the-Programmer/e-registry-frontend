import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CreateFileDialogComponent} from "./create-file-dialog/create-file-dialog.component";
import {RouterModule, Router} from "@angular/router";
import {FileService} from "../../services/file-service/file.service";
import {File} from "../../models/file.model";
import {MatHeaderCellDef, MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditFileDialogComponent} from "./edit-file-dialog/edit-file-dialog.component";
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-manage-files',
  standalone: true,
  imports: [
    MatIconModule, MatSortModule, MatInputModule, MatListModule,
    MatPaginatorModule, MatButtonModule, MatDialogModule, CommonModule,
    MatTableModule, HttpClientModule, FaIconComponent, RouterModule,
    MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable,
    MatToolbar, MatHeaderCellDef, JsonPipe],
  templateUrl: './manage-files.component.html',
  styleUrl: './manage-files.component.css'
})
export class ManageFilesComponent implements OnInit, AfterViewInit{

  files: File[] = [];
  departmentMap: { [key: number]: string } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  length = 50;

  pageEvent!: PageEvent;
  pageSize = 10;
  pageIndex = 0;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }


  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fileService: FileService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  dataSource = new MatTableDataSource<File>([]);
  displayedColumns: string[] = [
    'fileNo',
    'fileTitle',
    'fileSubject',
    'departmentId',
    'actions'
  ];

  departments: any[] = [];

  ngOnInit(){
    this.loadFiles();
    this.fetchDepartments();
  }

  loadFiles(): void {
    this.fileService.getAllFiles().subscribe((data) => {
      this.files = data;
      this.dataSource = new MatTableDataSource<File>(this.files); // Reinitialize datasource
      if (this.paginator && this.sort) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      console.log(this.files);
    });
    // Fetch all departments
    this.fileService.getAllDepartments().subscribe((departments) => {
      departments.forEach(department => {
        this.departmentMap[department.id] = department.departmentName;
      });
    });
  }

  deleteFile(fileId: string): void {
    this.fileService.deleteFile(fileId).subscribe(() => {
      this.files = this.files.filter(file => file.fileNo !== fileId);
    });
  }

  openCreateFileDialog(): void {
    const dialogRef = this.dialog.open(CreateFileDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((newFile) => {
      if (newFile) {
        // Add the new file to the list
        this.files.push({
          ...newFile,
          fileID: this.files.length + 1,
          lastUsed: new Date().toLocaleDateString(),
          numberOfMemos: 0,
          isActive: true,
        });
        this.dataSource.data = this.files;
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


  getDepartmentName(departmentId: number): string {
    return this.departmentMap[departmentId] || 'Loading...';
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
        this.fileService.updateFile(file.id, updatedFile).subscribe(
          {
          next: () => {
            console.log("updated File", file)

            this.snackBar.open('File updated successfully.', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error updating file:', err, updatedFile);

            this.snackBar.open('Failed to update file.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
