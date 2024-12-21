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
import {RouterLink} from "@angular/router";
import {faAngleDown, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-department-files',
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
  templateUrl: './department-files.component.html',
  styleUrl: './department-files.component.css'
})
export class DepartmentFilesComponent {

  protected readonly faAngleDown = faAngleDown;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  protected readonly faAngleLeft = faAngleLeft;
}
