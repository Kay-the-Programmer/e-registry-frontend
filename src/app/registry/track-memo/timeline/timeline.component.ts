import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoService } from "../../../services/memo-service/memo.service";
import {ActivatedRoute} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faBuildingCircleArrowRight,
  faCheckCircle,
  faLocation,
  faLocationArrow, faLocationDot, faMapLocationDot
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

  @Input() events: { date: string; action: string; description: string; department: string }[] = [];

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

  protected readonly faBuildingCircleArrowRight = faBuildingCircleArrowRight;
  protected readonly faCheckCircle = faCheckCircle;
  protected readonly faLocation = faLocation;
  protected readonly faLocationArrow = faLocationArrow;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faMapLocationDot = faMapLocationDot;
}
