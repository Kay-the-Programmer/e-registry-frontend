import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCaretDown,
  faEllipsisVertical,
  faFilter,
  faGear, faRotateRight
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-memos',
  standalone: true,
  imports: [MatTabsModule, FaIconComponent],
  templateUrl: './memos.component.html',
  styleUrl: './memos.component.css'
})
export class MemosComponent {

  protected readonly faEllipsisVertical = faEllipsisVertical;
  protected readonly faGear = faGear;
  protected readonly faFilter = faFilter;
  protected readonly faAngleLeft = faAngleLeft;
  protected readonly faAngleRight = faAngleRight;
  protected readonly faCaretDown = faCaretDown;
  protected readonly faRotateRight = faRotateRight;
}
