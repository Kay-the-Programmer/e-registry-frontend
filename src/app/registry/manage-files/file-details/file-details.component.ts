import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {PieChartModule} from "@swimlane/ngx-charts";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { HttpClient } from "@angular/common/http";
import {FileService} from "../../../services/file-service/file.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [
   NgxChartsModule, MatSortModule, MatPaginatorModule, CommonModule, MatCardModule, MatTableModule, MatProgressSpinnerModule, MatIconModule, PieChartModule, FaIconComponent],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.css'
})
export class FileDetailsComponent implements OnInit {
  readonly faExclamationCircle = faExclamationCircle;
  file: any;
  isLoading = false;
  displayedColumns: string[] = ['id', 'subject', 'from', 'to', 'createdAt'];
  activeMemos:{ name: string; value: number}[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fileService: FileService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const fileID = this.route.snapshot.paramMap.get('id');
    if (fileID) {
      this.fetchFileDetail(fileID);
      this.getFileStats(fileID);
    }
  }

  getFileStats(fileId: string): void {
    this.fileService.getFileStats(fileId).subscribe({
      next: (data) => {
        console.log(data);

        this.activeMemos = [
          { name: 'Users', value: data.users },
          { name: 'Approved memos', value: data.approvedMemos },
          { name: 'Pending memos', value: data.pendingMemos },
          { name: 'Total memos', value: data.totalMemos },
        ];
      },
      error: (error) => {
        console.error('Failed to fetch file statistics:', error);
        this.snackBar.open('Error fetching file statistics. Please try again.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  fetchFileDetail(fileID: string): void {
    this.isLoading = true;
    this.http.get(`http://localhost:3000/files/get-file-by-id/${fileID}`).subscribe({
      next: (data) => {
        this.file = data;
        console.log(this.file);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching file details:', error);
        this.isLoading = false;
      },
    });
  }

  navigateToMemo(memoId: number): void {
    this.router.navigate(['registry/dashboard/memo-details', memoId]);
  }

  isOddRow(row: any): boolean {
    return this.file?.memos.indexOf(row) % 2 !== 0;
  }
}
