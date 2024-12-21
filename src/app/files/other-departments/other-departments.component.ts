import { Component } from '@angular/core';
import {MatCardModule, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitleGroup} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleDown, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {MatChip, MatChipSet} from "@angular/material/chips";

@Component({
  selector: 'app-other-departments',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    FaIconComponent,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip
  ],
  templateUrl: './other-departments.component.html',
  styleUrl: './other-departments.component.css'
})
export class OtherDepartmentsComponent {

  protected readonly faAngleDown = faAngleDown;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  protected readonly faAngleLeft = faAngleLeft;
}
