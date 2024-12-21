import { Component } from '@angular/core';
import {TimelineComponent} from "../timeline/timeline.component";
import {MatToolbar} from "@angular/material/toolbar";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-memo-tracker',
  imports: [
    TimelineComponent,
    MatToolbar,
    FaIconComponent
  ],
  templateUrl: './memo-tracker.component.html',
  standalone: true,
  styleUrl: './memo-tracker.component.css'
})
export class MemoTrackerComponent {

  memoTimeline = [
    {
      date: '2024-12-07 09:00 AM',
      action: 'Created',
      description: 'Memo created by John Doe in the HR department.',
      department: 'HR',
    },
    {
      date: '2024-12-07 11:00 AM',
      action: 'Reviewed',
      description: 'Memo reviewed by Jane Smith in the Legal department.',
      department: 'Legal',
    },
    {
      date: '2024-12-07 02:00 PM',
      action: 'Approved',
      description: 'Memo approved by Sarah Connor in the Finance department.',
      department: 'Finance',
    },
    {
      date: '2024-12-08 08:00 AM',
      action: 'Forwarded',
      description: 'Memo forwarded to IT by the Finance department.',
      department: 'IT',
    },
  ];

  protected readonly faAngleRight = faAngleRight;
}
