import {ChangeDetectionStrategy, Component} from '@angular/core';
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
@Component({
  selector: 'app-registry-dashboard',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatTableModule, MatPaginatorModule, MatCardModule, NgxChartsModule, MatToolbar, MatTable],
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
export class RegistryDashboardComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'from', 'date', 'status']

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedRequest!: FileRequest | null;
  dataSource = new MatTableDataSource<FileRequest>(fileRequestsTable);
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

}

//file requests data
const fileRequestsTable: FileRequest[] = [
  { id: 1, from: 'Directorate of finance', date: '2024-12-12 10:30:00', status: 'pending', reason: 'Budget approval needed', sender: 'John Smith' },
  { id: 2, from: 'Human Resources', date: '2024-12-11 09:15:00', status: 'approved', reason: 'New hire onboarding files', sender: 'Jane Doe' },
  { id: 3, from: 'IT Department', date: '2024-12-10 14:00:00', status: 'rejected', reason: 'Incomplete documentation', sender: 'Alice Brown' },
  { id: 4, from: 'Marketing', date: '2024-12-09 08:45:00', status: 'pending', reason: 'Approval of campaign expenses', sender: 'Bob Johnson' },
  { id: 5, from: 'Legal Department', date: '2024-12-08 16:00:00', status: 'approved', reason: 'Contract review for vendors', sender: 'Emily Davis' },
  { id: 6, from: 'Directorate of finance', date: '2024-12-07 12:30:00', status: 'pending', reason: 'Finalizing quarterly reports', sender: 'Michael Wilson' },
  { id: 7, from: 'Sales Team', date: '2024-12-06 11:20:00', status: 'rejected', reason: 'Request outside authorized period', sender: 'Chris Martin' },
  { id: 8, from: 'IT Department', date: '2024-12-05 13:10:00', status: 'approved', reason: 'Infrastructure upgrade proposal', sender: 'Sophia White' },
  { id: 9, from: 'Human Resources', date: '2024-12-04 15:00:00', status: 'pending', reason: 'Employee termination paperwork', sender: 'James Anderson' },
  { id: 10, from: 'Marketing', date: '2024-12-03 10:25:00', status: 'rejected', reason: 'Insufficient budget allocation', sender: 'Sarah Taylor' },
  { id: 11, from: 'Sales Team', date: '2024-12-02 17:50:00', status: 'approved', reason: 'Client contract submission', sender: 'David Thomas' },
  { id: 12, from: 'Legal Department', date: '2024-12-01 14:00:00', status: 'pending', reason: 'Compliance audit files', sender: 'Olivia Moore' },
  { id: 13, from: 'Directorate of finance', date: '2024-11-30 09:30:00', status: 'approved', reason: 'Expense reimbursement approval', sender: 'Ethan Martin' },
  { id: 14, from: 'IT Department', date: '2024-11-29 16:00:00', status: 'rejected', reason: 'Duplicate request detected', sender: 'Emma Harris' },
  { id: 15, from: 'Human Resources', date: '2024-11-28 13:45:00', status: 'pending', reason: 'Leave management files', sender: 'Daniel Clark' },
  { id: 16, from: 'Sales Team', date: '2024-11-27 11:00:00', status: 'approved', reason: 'Quarterly sales reports', sender: 'Mia Lewis' },
  { id: 17, from: 'Marketing', date: '2024-11-26 08:30:00', status: 'rejected', reason: 'Insufficient campaign details', sender: 'Noah Walker' },
  { id: 18, from: 'Legal Department', date: '2024-11-25 12:00:00', status: 'pending', reason: 'Dispute resolution documents', sender: 'Lily Hall' },
  { id: 19, from: 'Directorate of finance', date: '2024-11-24 10:15:00', status: 'approved', reason: 'Annual budget review', sender: 'William Allen' },
  { id: 20, from: 'IT Department', date: '2024-11-23 14:30:00', status: 'rejected', reason: 'Incorrect request format', sender: 'Charlotte Scott' },
];
