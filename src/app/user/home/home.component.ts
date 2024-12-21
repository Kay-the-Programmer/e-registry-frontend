import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {ComponseMemoComponent} from "../componse-memo/componse-memo.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  faMagnifyingGlass,
  faCaretSquareUp,
  faUserCircle,
  faBuilding,
  faBuildingCircleArrowRight
} from "@fortawesome/free-solid-svg-icons";
import {CommonModule} from "@angular/common";
import {MatTooltipModule} from '@angular/material/tooltip';
import {InboxComponent} from "../../memos/inbox/inbox.component";

/**
 * @title Determinate progress-bar
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html',
  imports: [MatProgressBarModule],
  standalone: true
})
export class ProgressBar {}



/**
 * @title memo trail Card
 */
@Component({
  selector: 'memo-trail',
  templateUrl: 'memo-trail.html',
  styleUrl: 'memo-trail.css',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, FontAwesomeModule, CommonModule, ProgressBar, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MemoTrailComponent {
  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  // icons
  faMagnifyingGlass = faMagnifyingGlass;
  faCaretSquareUp = faCaretSquareUp;
  faUserCircle = faUserCircle;

  //dynamic interactions
  showSearchIconBtn = true;
  showSearchIco(){
    this.showSearchIconBtn = true
  }

  protected readonly faBuilding = faBuilding;
  protected readonly faBuildingCircleArrowRight = faBuildingCircleArrowRight;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTabsModule,
    MatCardModule, MatChipsModule, MatProgressBarModule, MemoTrailComponent, ComponseMemoComponent, InboxComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

