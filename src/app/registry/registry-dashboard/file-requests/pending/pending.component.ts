import {ChangeDetectorRef, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileRequest} from "../../../../models/file.request.model";
import {ConfirmApprovalComponent} from "../../confirm-approval/confirm-approval.component";
import {CommentDialogComponent} from "../../comment-dialog/comment-dialog.component";

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
    ReactiveFormsModule
  ],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchFileRequests();
  }

  fileRequests: FileRequest[] = [];
  comment: string = '';

  fileRequestsStats = [
    { name: 'Pending', value: 10 },
    { name: 'Approved', value: 8 },
    { name: 'Rejected', value: 2 },
    { name: 'Total', value: 20 },
  ];

  fetchFileRequests() {
    const apiUrl = 'http://localhost:3000/file-requests/get-all-file-requests';
    this.http.get<FileRequest[]>(apiUrl).subscribe({
      next: (data) => {
        this.fileRequests = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching file requests:', err);
      },
    });
  }

  openDialog(requestId: number): void {
    const dialogRef = this.dialog.open(ConfirmApprovalComponent, {
      width: '350px',
      data: { requestId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.approveRequest(requestId, result.comment);
      } else {
        console.log(`Approval for request ${requestId} was canceled.`);
      }
    });
  }

  onConfirmRejection(requestId: number): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '350px',
      data: { requestId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.rejectRequest(requestId, result.comment);
        window.location.reload();
      } else {
        console.log(`Approval for request ${requestId} was canceled.`);
      }
    });
  }

  approveRequest(requestId: number, comment: string): void {
    const status = 'Successful';
    const apiUrl = `http://localhost:3000/file-requests/update-request/${requestId}`;
    const params = { status, comment };

    this.http.patch(apiUrl, null, { params }).subscribe({
      next: () => {
        this.snackbar.open(`Request ${requestId} approved successfully with comment: ${comment}`, 'Okay', {
          duration: 3000,
        });
        const request = this.fileRequests.find(req => req.id === requestId);
        if (request) {
          request.status = status;
          this.cdr.markForCheck();
          window.location.reload();
        }
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
          duration: 3000,
        });
        const request = this.fileRequests.find(req => req.id === requestId);
        if (request) {
          request.status = status;
          this.cdr.markForCheck();
          window.location.reload();
        }
      },
      error: (err) => {
        console.error(`Error rejecting request ${requestId}:`, err);
      },
    });
  }

}
