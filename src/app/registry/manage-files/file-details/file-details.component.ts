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
import {FileService} from "../../../services/file-service/file.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [RouterModule, NgxChartsModule, MatSortModule, MatPaginatorModule, CommonModule, MatCardModule, MatTableModule, MatProgressSpinnerModule, MatIconModule, PieChartModule, FaIconComponent],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.css'
})
export class FileDetailsComponent implements OnInit{
  file: any; // Replace with your file model
  isLoading = true;
  displayedColumns: string[] = ['id', 'title', 'content', 'date'];
  load = true;
  constructor(private route: ActivatedRoute, private router: Router, private fileService: FileService) {}

  // Sample data for ngx-charts graphs
  activeMemos = [
    { name: 'Open', value: 15 },
    { name: 'Closed', value: 5 },
  ];

  ngOnInit(): void {
    const fileID = this.route.snapshot.paramMap.get('id');
    if (fileID) {
      this.fetchFileDetails(fileID);  // Pass the string directly
    }
  }

  navigateToMemo(memoId: number): void {
    this.router.navigate(['registry/dashboard/memo-details', memoId]); // Adjust the route as needed
  }

  isOddRow(row: any): boolean {
    return this.file?.memos.indexOf(row) % 2 !== 0;
  }

  fetchFileDetails(fileID: String): void {
    // Mock file data for demonstration (replace with API call)
    // this.fileService.

    const mockFiles = [
      {
        fileID: 'F001',
        fileName: 'File 1',
        fileSubject: 'Subject 1',
        fileDepartment: 'HR',
        lastUsed: '2024-12-01',
        numberOfMemos: 5,
        isActive: true,
        memos: [
          { id: 1, title: 'Memo 1', content: 'Content of memo 1', date: '2024-11-30' },
          { id: 2, title: 'Memo 2', content: 'Content of memo 2', date: '2024-12-01' },
        ],
      },
      {
        fileID: 'F002',
        fileName: 'File 2',
        fileSubject: 'Subject 2',
        fileDepartment: 'Finance',
        lastUsed: '2024-11-28',
        numberOfMemos: 3,
        isActive: false,
        memos: [
          { id: 3, title: 'Memo 3', content: 'Content of memo 3', date: '2024-11-27' },
        ],
      },
    ];

    // Find the file with the given ID
    this.file = mockFiles.find((file) => file.fileID === fileID);
    this.isLoading = false;
  }

  // fetchFileDetail(fileID: number): void {
  //   this.isLoading = true;
  //   this.http.get(`http://your-api-url/files/${fileID}`).subscribe({
  //     next: (data) => {
  //       this.file = data;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching file details:', error);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  protected readonly faExclamationCircle = faExclamationCircle;
}
