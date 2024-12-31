import {Component, OnInit} from '@angular/core';
import {TimelineComponent} from "../timeline/timeline.component";
import {MatToolbar} from "@angular/material/toolbar";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MemoService} from "../../../services/memo-service/memo.service";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {MemosListComponent} from "../memos-list/memos-list.component";

@Component({
  selector: 'app-memo-tracker',
  imports: [
    TimelineComponent,
    MatToolbar,
    FaIconComponent,
    RouterOutlet,
    MemosListComponent
  ],
  templateUrl: './memo-tracker.component.html',
  standalone: true,
  styleUrl: './memo-tracker.component.css'
})
export class MemoTrackerComponent implements OnInit{

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

  memo: any = {}; // Store memo data
  errorMessage: string = ''; // For storing error messages

  constructor(
    private memoService: MemoService, // MemoService injection
    private route: ActivatedRoute // To get the id from route params
  ) {}

  ngOnInit(): void {
    const memoId = this.route.snapshot.paramMap.get('id'); // Get memo id from route
    if (memoId) {
      this.fetchMemoById(Number(memoId)); // Fetch memo data by id
    }
  }

  // Fetch memo by id
  fetchMemoById(id: number): void {
    this.memoService.getMemoById(id).subscribe(
      (response) => {
        this.memo = response; // Store fetched memo data
      },
      (error) => {
        this.errorMessage = 'Error fetching memo: ' + error.message;
        console.error('Error:', error); // Log error
      }
    );
  }
}
