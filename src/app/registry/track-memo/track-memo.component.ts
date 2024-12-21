import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDividerModule } from '@angular/material/divider';
import {MemoTrackerComponent} from "./memo-tracker/memo-tracker.component";

@Component({
  selector: 'app-track-memo',
  standalone: true,
  imports: [MatToolbarModule, NgxChartsModule, MatDividerModule, MemoTrackerComponent],
  templateUrl: './track-memo.component.html',
  styleUrl: './track-memo.component.css'
})
export class TrackMemoComponent {
// Sample data for memo movement visualization
  memoFlowData = [
    {
      name: 'Alice to Bob',
      value: 15, // Number of memos sent
    },
    {
      name: 'Bob to Charlie',
      value: 10,
    },
    {
      name: 'Charlie to Diana',
      value: 5,
    },
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
