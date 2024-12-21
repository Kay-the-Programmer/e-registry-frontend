import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleDown, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {MatChip, MatChipSet} from "@angular/material/chips";

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatToolbar,
    FaIconComponent,
    MatChip,
    MatChipSet,
    RouterOutlet,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  protected readonly faFolderOpen = faFolderOpen;

  protected readonly faAngleDown = faAngleDown;
}
