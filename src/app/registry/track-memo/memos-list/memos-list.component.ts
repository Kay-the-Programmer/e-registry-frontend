import {Component, OnInit} from '@angular/core';
import { MemoService } from "../../../services/memo-service/memo.service";
import {Memo} from "../../../models/memo.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-memos-list',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './memos-list.component.html',
  styleUrl: './memos-list.component.css'
})
export class MemosListComponent implements OnInit {
  memos: any[] = [];
  errorMessage: string = '';

  constructor(private memoService: MemoService) {
  }

  ngOnInit(): void {
    this.fetchMemos(); // Call the fetch method on component load
  }

  fetchMemos(): void {
    this.memoService.getAllMemos().subscribe(
      (response) => {
        this.memos = response; // Store the response data in the memos array
      },
      (error) => {
        this.errorMessage = 'Error fetching memos: ' + error.message; // Show error if request fails
        console.error('Error:', error); // Log the error to the console
      }
    );
  }
}
