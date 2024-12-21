import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from "@angular/common";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
import {faUpRightAndDownLeftFromCenter, faUser, faWindowMinimize} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-componse-memo',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatRippleModule, MatTooltipModule, CommonModule, FontAwesomeModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './componse-memo.component.html',
  styleUrl: './componse-memo.component.css'
})
export class ComponseMemoComponent {
  memo_placeholder= 'Compose new memo';

  isVisible = true;
  welcomeVisible = false;
  chooseDestination = 'to'

  //icons
  userIcon = faUser;
  toggleVisibility() {
    if (!this.isVisible) {
      this.isVisible = true;
    } else {
      this.isVisible = true;
    }
    this.memo_placeholder= 'Enter memo subject';
    this.welcomeVisible = false;
  }

  toggleBackVisibility(){
    this.isVisible = !this.isVisible;
    this.welcomeVisible = true;
    this.memo_placeholder= 'Compose new memo';
  }


//   recipients
  showDestinationField = false;

  // css classes
  destinationInput = 'destination';

  ccVisible = true;
  ufsVisible = true;
  ufsInvisible = false;
  ccInvisible = false;

  toggleUfs(){
    this.ufsVisible = !this.ufsVisible;
    this.ufsInvisible = !this.ufsInvisible;
  }

  toggleCc(){
    this.ccVisible = !this.ccVisible;
    this.ccInvisible = !this.ccInvisible;
  }

  saveDraftBtn = true;
  sendBtnDisabled = true

  protected readonly faUpRightAndDownLeftFromCenter = faUpRightAndDownLeftFromCenter;
  protected readonly faWindowMinimize = faWindowMinimize;
}
