import {Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, signal, Signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RouterModule, Router } from "@angular/router";
import { FileService } from "../../services/file-service/file.service";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateFileDialogComponent } from "./create-file-dialog/create-file-dialog.component";
import { MatToolbar } from "@angular/material/toolbar";
import { faFolderClosed, faFolderPlus, faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { DeleteFileConfirmationComponent } from "./delete-file-confirmation/delete-file-confirmation.component";
import { FilesListComponent } from "./files-list/files-list.component";
import { AccessControlComponent } from "./access-control/access-control.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
@Component({
  selector: 'app-manage-files',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatDialogModule, CommonModule,
    FaIconComponent, RouterModule, MatToolbar, DeleteFileConfirmationComponent,
    FilesListComponent, AccessControlComponent, MatTabsModule, MatFormFieldModule, MatInput, MatTableModule
  ],
  templateUrl: './manage-files.component.html',
  styleUrls: ['./manage-files.component.css'],

})
export class ManageFilesComponent{
  length!: number;

  files: any[] = [];
  departments: any[] = [];

  protected readonly faFolderClosed = faFolderClosed;
  protected readonly faFolderPlus = faFolderPlus;
  protected readonly faLock = faLock;
  protected readonly faUserPlus = faUserPlus;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fileService: FileService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}



}
