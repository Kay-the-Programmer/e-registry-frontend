import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {faBars, faBell, faSignOut} from "@fortawesome/free-solid-svg-icons";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RegistrySidebarComponent} from "../registry-sidebar/registry-sidebar.component";

@Component({
  selector: 'app-registry-board',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    MatTooltip,
    NgOptimizedImage,
    RouterLink,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    RegistrySidebarComponent
  ],
  templateUrl: './registry-board.component.html',
  styleUrl: './registry-board.component.css'
})
export class RegistryBoardComponent {
  showFiller = false;
  protected readonly faBars = faBars;
  protected readonly faBell = faBell;
  protected readonly faSignOut = faSignOut;
  drawerSize: number = 300;
}
