import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {
  faBuilding,
  faChartSimple,
  faCircleUser, faDashboard,
  faFileLines, faFolderPlus,
  faFolderTree,
  faMapLocationDot,
  faPencil, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-registry-sidebar',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './registry-sidebar.component.html',
  styleUrl: './registry-sidebar.component.css'
})
export class RegistrySidebarComponent implements OnInit{

  protected readonly faPencil = faPencil;
  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faCircleUser = faCircleUser;
  protected readonly faFileLines = faFileLines;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faDashboard = faDashboard;
  protected readonly faUsers = faUsers;
  protected readonly faFolderPlus = faFolderPlus;
  userName : string | null = null;
  fetchUserName (){
    const userToken = sessionStorage.getItem('authToken'); // Or use localStorage.getItem('authToken') if stored there
    if (userToken) {
      // Decode the token to extract the user's email (assuming the email is stored in the token)
      const decodedToken = JSON.parse(atob(userToken.split('.')[1])); // Decode JWT token
      const userEmail = decodedToken.email; // Assuming the email is stored in the token payload
      this.userName = decodedToken.fName + " " + decodedToken.lName;
    }
  }
  ngOnInit(): void {
    this.fetchUserName();
  }

  protected readonly faBuilding = faBuilding;
}
