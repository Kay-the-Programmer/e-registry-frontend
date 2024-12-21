import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memo-details',
  standalone: true,
  imports: [],
  templateUrl: './memo-details.component.html',
  styleUrl: './memo-details.component.css'
})
export class MemoDetailsComponent implements OnInit{
  memoId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.memoId = this.route.snapshot.paramMap.get('id');
  }
}
