import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileRequest} from "../../../../models/file.request.model";
import {ConfirmApprovalComponent} from "../../confirm-approval/confirm-approval.component";
import {CommentDialogComponent} from "../../comment-dialog/comment-dialog.component";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [
    FormsModule,
    MatAccordion,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatLabel,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatTableModule,
    MatIconButton,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PendingComponent implements OnInit{

  dataSource = new MatTableDataSource<any[]>([]);
  columnsToDisplay = ['name', 'weight', ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: any | null;
  fileRequests: any[] = [];
  comment: string = '';


  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchFileRequests();
  }


  fetchFileRequests() {
    const apiUrl = 'http://localhost:3000/file-requests/get-all-file-requests';
    this.http.get<FileRequest[]>(apiUrl).subscribe({
      next: (data) => {
        this.fileRequests = data;
        this.dataSource.data  = this.fileRequests;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching file requests:', err);
      },
    });
  }

  openDialog(requestId: number, userId: number, fileNo: string): void {
    const dialogRef = this.dialog.open(ConfirmApprovalComponent, {
      width: '400px',
      data: { requestId, userId, fileNo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.approveRequest(requestId, result.comment, userId, fileNo);
      } else {
        console.log(`Approval for request ${requestId} was canceled.`);
      }
    });
  }

  onConfirmRejection(requestId: number): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: { requestId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.rejectRequest(requestId, result.comment);
      } else {
        console.log(`Approval for request ${requestId} was canceled.`);
      }
    });
  }

  approveRequest(requestId: number, comment: string, userId: number, fileNo: string): void {
    const status = 'Successful';
    const apiUrl = `http://localhost:3000/file-requests/update-request/${requestId}`;
    const params = { status, comment };
    const accessUrl = `http://localhost:3000/files/add-user-to-file/${fileNo}/${userId}`;
    this.http.patch(apiUrl, null, { params }).subscribe({
      next: () => {
        this.http.patch(accessUrl, null, { params }).subscribe({
        })
        this.snackbar.open(`Request ${requestId} approved successfully with comment: ${comment}`, 'Okay', {
          duration: 3000,  verticalPosition: 'bottom', horizontalPosition: 'left'
        });

        this.fetchFileRequests();
      },
      error: (err) => {
        console.error(`Error approving request ${requestId}:`, err);
      },
    });
  }

  rejectRequest(requestId: number, comment: string): void {
    const status = 'Rejected';
    const apiUrl = `http://localhost:3000/file-requests/update-request/${requestId}`;
    const params = { status, comment };

    this.http.patch(apiUrl, null, { params }).subscribe({
      next: () => {
        this.snackbar.open(`Request successfully rejected with comment.`, 'Close', {
          duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'left'
        });
        this.fetchFileRequests();
      },
      error: (err) => {
        console.error(`Error rejecting request ${requestId}:`, err);
      },
    });
  }
}

