import { Component } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faCircleUser,
  faFolderTree,
  faChartSimple,
  faFileLines,
  faListCheck,
  faPencil, faMapLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { RouterModule } from "@angular/router";
import { routes } from "../../app.routes";

@Component({
  selector: 'app-left-sidenav',
  standalone: true,
  imports: [
    FontAwesomeModule, RouterModule
  ],
  templateUrl: './left-sidenav.component.html',
  styleUrl: './left-sidenav.component.css'
})
export class LeftSidenavComponent {
  faCircleUser = faCircleUser;
  faFolderTree = faFolderTree;
  faChartSimple = faChartSimple;
  faFileLines = faFileLines;
  faListCheck = faListCheck;
  faClock = faClock;
  protected readonly faPencil = faPencil;
  protected readonly faMapLocationDot = faMapLocationDot;
}
