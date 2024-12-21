import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSmImage,
  MatCardSubtitle, MatCardTitle, MatCardTitleGroup
} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {faAngleDown, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-file-overview',
  standalone: true,
  imports: [
    FaIconComponent,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSmImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatChip,
    MatChipSet,
    RouterLink
  ],
  templateUrl: './file-overview.component.html',
  styleUrl: './file-overview.component.css'
})
export class FileOverviewComponent {

  protected readonly faAngleDown = faAngleDown;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  protected readonly faAngleLeft = faAngleLeft;
  protected readonly faAngleRight = faAngleRight;
}
