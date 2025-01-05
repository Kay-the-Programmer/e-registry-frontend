import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {RegistrySidebarComponent} from "./registry-sidebar/registry-sidebar.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {faBell, faSignOut} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [
    RouterOutlet,
    RegistrySidebarComponent,
    FaIconComponent,
    FormsModule,
    MatDrawer,
    MatDrawerContainer,
    MatTooltip,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css'
})
export class RegistryComponent {

  protected readonly faBell = faBell;
  protected readonly faSignOut = faSignOut;
  drawerSize: number = 300;

}
