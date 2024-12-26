import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTable} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {FileRequest} from "../../models/file.request.model";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CommentDialogComponent} from "./comment-dialog/comment-dialog.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-registry-dashboard',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatExpansionModule, MatDialogModule, HttpClientModule, CommonModule, MatTableModule, MatPaginatorModule, MatCardModule, NgxChartsModule, MatToolbar, MatTable, FaIconComponent],
  templateUrl: './registry-dashboard.component.html',
  styleUrl: './registry-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RegistryDashboardComponent implements AfterViewInit, OnInit{
  readonly panelOpenState = signal(false);

  constructor(private http : HttpClient, private dialog : MatDialog, ) {
  }

  displayedColumns: string[] = ['fileNo', 'reason', 'status']

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedRequest!: FileRequest | null;
  dataSource = new MatTableDataSource<FileRequest>();
  // Sample data for ngx-charts graphs
  fileRequests = [
    { name: 'Pending', value: 10 },
    { name: 'Approved', value: 8 },
    { name: 'Rejected', value: 2 },
    { name: 'Total', value: 20 },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  colorScheme='vivid';

  //fetch file requests from the API
  fetchFileRequests(){

    const apiUrl = 'http://localhost:3000/file-requests/get-all-file-requests'; // API URL
    this.http.get<FileRequest[]>(apiUrl).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error fetching file requests:', err);
      }
    });
  }

  ngOnInit() {
    this.fetchFileRequests(); // Fetch the file requests when the component initializes
  }

  openCommentDialogOnDelete(requestId: string): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: { requestId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the comment (result.comment) and approve the request
        console.log('Approval comment:', result.comment);
        this.rejectRequest(requestId, result.comment);
      }
    });
  }

  openCommentDialog(requestId: string): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: { requestId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the comment (result.comment) and approve the request
        console.log('Approval comment:', result.comment);
        this.approveRequest(requestId, result.comment);
      }
    });
  }

  approveRequest(requestId: string, comment: string): void {
    // Add your logic to approve the request with the comment
    console.log(`Request ${requestId} approved with comment: ${comment}`);
  }

  rejectRequest(requestId: string, comment: string) {
    console.log(`Request ${requestId} rejected: ${comment}`);
  }

  protected readonly faUserCircle = faUserCircle;
}
