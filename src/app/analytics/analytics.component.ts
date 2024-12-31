import { Component } from '@angular/core';
import {MemosListComponent} from "../registry/track-memo/memos-list/memos-list.component";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    MemosListComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

}
