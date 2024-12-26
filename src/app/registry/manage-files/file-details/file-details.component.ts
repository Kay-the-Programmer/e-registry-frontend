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
import {HttpClientModule, HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NgxChartsModule, MatSortModule, MatPaginatorModule, CommonModule, MatCardModule, MatTableModule, MatProgressSpinnerModule, MatIconModule, PieChartModule, FaIconComponent],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.css'
})
export class FileDetailsComponent implements OnInit {
  readonly faExclamationCircle = faExclamationCircle;
  file: any; // Replace with your file model
  isLoading = false;
  displayedColumns: string[] = ['id', 'subject', 'from', 'to', 'createdAt'];
  activeMemos = [
    { name: 'Open', value: 15 },
    { name: 'Closed', value: 5 },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const fileID = this.route.snapshot.paramMap.get('id');
    if (fileID) {
      this.fetchFileDetail(fileID);
    }
  }

  fetchFileDetail(fileID: string): void {
    this.isLoading = true;
    this.http.get(`http://localhost:3000/files/get-file-by-id/${fileID}`).subscribe({
      next: (data) => {
        this.file = data;
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
