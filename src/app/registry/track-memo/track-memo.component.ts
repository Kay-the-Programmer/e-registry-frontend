import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDividerModule } from '@angular/material/divider';
import {MemoTrackerComponent} from "./memo-tracker/memo-tracker.component";
import {MatCard} from "@angular/material/card";
import {TimelineComponent} from "./timeline/timeline.component";

@Component({
  selector: 'app-track-memo',
  standalone: true,
  imports: [MatToolbarModule, NgxChartsModule, MatDividerModule, MemoTrackerComponent, MatCard, TimelineComponent],
  templateUrl: './track-memo.component.html',
  styleUrl: './track-memo.component.css'
})
export class TrackMemoComponent {
  // Sample data for memo movement visualization
  memoFlowData = [
    {
      date: '12/12/2020',
      action: 'Alice Created',
      description: "Memo created",
      department: 'HR',
    }
  ];

  colorScheme = 'vivid';

  // Mock data for recent memos
  recentMemos = [
    { memoID: 'M001', title: 'Budget Approval', isActive: true },
    { memoID: 'M002', title: 'Project Update', isActive: false },
    { memoID: 'M003', title: 'HR Policy Change', isActive: true },
    { memoID: 'M004', title: 'Meeting Minutes', isActive: false },
    { memoID: 'M005', title: 'IT Maintenance Schedule', isActive: true },
  ];
}
