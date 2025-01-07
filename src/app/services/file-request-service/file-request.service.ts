import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError, Observable, throwError} from 'rxjs';
import { FileRequest } from "../../models/file.request.model";
import { ConfirmApprovalComponent } from "../../registry/registry-dashboard/confirm-approval/confirm-approval.component";
import { CommentDialogComponent } from "../../registry/registry-dashboard/comment-dialog/comment-dialog.component";
@Injectable({
  providedIn: 'root'
})
export class FileRequestService {
  private baseUrl = 'http://localhost:3000/file-requests';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  fetchFileRequests(): Observable<FileRequest[]> {
    const apiUrl = `${this.baseUrl}/get-all-file-requests`;
    return this.http.get<FileRequest[]>(apiUrl);
  }

  openApprovalDialog(requestId: number): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmApprovalComponent, {
      width: '350px',
      data: { requestId },
    });
    return dialogRef.afterClosed();
  }

  openRejectionDialog(requestId: number): Observable<any> {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '350px',
      data: { requestId },
    });
    return dialogRef.afterClosed();
  }

  approveRequest(requestId: number, comment: string): Observable<void> {
    const apiUrl = `${this.baseUrl}/update-request/${requestId}`;
    const params = { status: 'Successful', comment };
    return this.http.patch<void>(apiUrl, null, { params });
  }

  rejectRequest(requestId: number, comment: string): Observable<void> {
    const apiUrl = `${this.baseUrl}/update-request/${requestId}`;
    const params = { status: 'Rejected', comment };
    return this.http.patch<void>(apiUrl, null, { params });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
    });
  }

  // Fetch requests based on status
  fetchRequestsByStatus(status: string): Observable<FileRequest[]> {
    const url = `${this.baseUrl}/get-all-file-requests`;
    return this.http.get<FileRequest[]>(url, { params: { status } });
  }

  getStats(): Observable<{ status: string; count: number }[]> {
    const url = `${this.baseUrl}/get-stats`;
    return this.http.get<{ status: string; count: number }[]>(url);
  }

  sendFileRequest(
    fileNo: string,
    requestedBy: number,
    reason: string,
    comment: string,
    status: string = 'Pending'
  ): Observable<void> {
    const url = `${this.baseUrl}/create-request`;
    const body = {
      requestedBy: requestedBy,
      fileNo: fileNo,
      reason: reason,
      comment: comment,
      status: status,
    };

    return this.http.post<void>(url, body).pipe(
      catchError((error) => {
        console.error('Error sending file request:', error);
        return throwError(() => new Error('Failed to send file request'));
      })
    );
  }

}
