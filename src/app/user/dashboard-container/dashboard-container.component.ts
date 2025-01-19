import {AfterViewInit, Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {DrawerService} from "../user-service/user-service.service";
import {LeftSidenavComponent} from "../left-sidenav/left-sidenav.component";
import {HomeComponent} from "../home/home.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {faBell, faHouse, faSignOut} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {TrackMemoComponent} from "../track-memo/track-memo.component";


@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, LeftSidenavComponent, HomeComponent, RouterOutlet, HeaderComponent, FaIconComponent, FormsModule, MatTooltip, NgOptimizedImage, RouterLink, RouterLinkActive, TrackMemoComponent],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.css',
  // providers: [DrawerService],
})
export class DashboardContainerComponent implements OnInit, AfterViewInit{
  @ViewChild('drawer') drawer!: MatDrawer;

  showFiller = false;

  constructor(private drawerService: DrawerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('DashboardContainerComponent initialized');
    this.drawerService.toggle$.subscribe(() => {
      console.log('Signal received in DashboardContainerComponent');
      this.drawer?.toggle();
    });
  }

  drawerWidth = 300;  // Default width of the drawer in pixels
  smallWidth = 60;  //| Small size for the drawer
  largeWidth = 300; // |Large size for the drawer
  isDrawerOpened = true; // Control whether the drawer is open or closed

  ngAfterViewInit() {
    this.drawerService.toggle$.subscribe(() => {
      // Toggle the width when the drawer is opened or closed
      if (this.isDrawerOpened) {
        this.drawerWidth = this.drawerWidth === this.largeWidth ? this.smallWidth : this.largeWidth;
      } else {
        this.drawerWidth = this.largeWidth;
      }

      console.log('Drawer width toggled:', this.drawerWidth);

      // Manually trigger change detection to update the template
      this.cdr.detectChanges();

      // Optionally, toggle the drawer's open state
      this.isDrawerOpened = !this.isDrawerOpened;
    });
  }

    protected readonly faSignOut = faSignOut;
    protected readonly faBell = faBell;
  protected readonly faHouse = faHouse;
  rightDrawerSize: number = 300;
}
