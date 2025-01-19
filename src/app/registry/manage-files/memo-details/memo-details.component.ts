import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCard} from "@angular/material/card";
import {MemoService} from "../../../services/memo-service/memo.service";
import {DatePipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHistory, faMapLocationDot} from "@fortawesome/free-solid-svg-icons";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-memo-details',
  standalone: true,
  imports: [
    MatCard,
    NgOptimizedImage,
    NgIf,
    JsonPipe,
    DatePipe,
    NgForOf,
    MatButton,
    FaIconComponent,
    MatProgressBar
  ],
  templateUrl: './memo-details.component.html',
  styleUrl: './memo-details.component.css'
})
export class MemoDetailsComponent implements OnInit{
  memoId: number | null = null; // Changed type to number | null
  memo: any = null;
  isHistoryVisible: boolean = false;  // Track the visibility of history section
  @ViewChild('historySection') historySection!: ElementRef; // Reference to the history section


  constructor(
    private route: ActivatedRoute,
    private memoService: MemoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Retrieve the ID
    this.memoId = id ? +id : null; // Convert the ID to a number using the unary `+` operator
    if (this.memoId !== null) {
      this.getMemoDetails(); // Fetch memo details only if the ID is valid
    }
  }

  getMemoDetails(): void {
    if (this.memoId !== null) {
      this.memoService.getMemoById(this.memoId).subscribe({
        next: (response) => {
          this.memo = response;
          console.log(this.memo);
        },
        error: (err) => {
          console.error('Error fetching memo details:', err);
        },
      });
    }
  }

  toggleHistoryVisibility(): void {
    this.isHistoryVisible = !this.isHistoryVisible;

    if (this.isHistoryVisible) {
      // Wait for the DOM to update before scrolling
      setTimeout(() => {
        this.scrollToHistory();
      }, 0);
    }
  }

  scrollToHistory(): void {
    if (this.historySection) {
      console.log('Scrolling to history section:', this.historySection);
      this.historySection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('History section not found.');
    }
  }

  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faHistory = faHistory;
}
