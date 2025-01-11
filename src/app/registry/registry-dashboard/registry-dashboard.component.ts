import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTable } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {  MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ConfirmApprovalComponent } from "./confirm-approval/confirm-approval.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {FileRequestService} from "../../services/file-request-service/file-request.service";
import {PendingComponent} from "./file-requests/pending/pending.component";
import {RejectedComponent} from "./file-requests/rejected/rejected.component";
import {ApprovedComponent} from "./file-requests/approved/approved.component";
import {RouterModule} from "@angular/router";
import {MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-registry-dashboard',
  standalone: true,
  imports: [
    FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatIconModule,
    ConfirmApprovalComponent, MatButtonModule, MatExpansionModule, MatDialogModule,
    CommonModule, RouterModule, MatCardModule, NgxChartsModule, MatToolbar, MatTable,
    FaIconComponent, PendingComponent, RejectedComponent, ApprovedComponent,
    MatTabsModule,
  ],
  templateUrl: './registry-dashboard.component.html',
  styleUrl: './registry-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RegistryDashboardComponent implements OnInit {
  fileRequestsStats: { name: string; value: number }[] = [];

  constructor(
    private fileRequestService: FileRequestService,
  ) {}

  ngOnInit(): void {
    this.fetchFileRequestsStats();
  }

  fetchFileRequestsStats(): void {
    this.fileRequestService.getStats().subscribe({
      next: (stats) => {
        const total = stats.reduce((sum, item) => sum + item.count, 0);
        this.fileRequestsStats = [
          { name: 'Pending', value: this.getCount(stats, 'Pending') },
          { name: 'Approved', value: this.getCount(stats, 'Successful') },
          { name: 'Rejected', value: this.getCount(stats, 'Rejected') },
          { name: 'Total', value: total },
        ];
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
      },
    });
  }

  private getCount(stats: { status: string; count: number }[], status: string): number {
    const stat = stats.find((item) => item.status === status);
    return stat ? stat.count : 0;
  }
}
