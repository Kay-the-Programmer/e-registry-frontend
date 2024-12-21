import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTabsModule} from '@angular/material/tabs';
import {faPencil, faInbox, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {MatCardModule} from "@angular/material/card";
import {ComponseMemoComponent} from "../user/componse-memo/componse-memo.component";

import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    FontAwesomeModule, MatTabsModule, MatCardModule, MatButtonModule, ComponseMemoComponent, RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  faPen = faPencil;
  faInbox = faInbox;
  faPaperPlane = faPaperPlane;
}
