import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBars, faBell, faSignOut} from "@fortawesome/free-solid-svg-icons";
import {MatTooltip} from "@angular/material/tooltip";
import {DrawerService} from "../user-service/user-service.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    FaIconComponent,
    MatTooltip,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // providers: [DrawerService],
})
export class HeaderComponent {

  constructor(private drawerService: DrawerService) {}

  toggle() {
    this.drawerService.toggleDrawer();
  }

  protected readonly faBars = faBars;
  protected readonly faBell = faBell;
  protected readonly faSignOut = faSignOut;
}
