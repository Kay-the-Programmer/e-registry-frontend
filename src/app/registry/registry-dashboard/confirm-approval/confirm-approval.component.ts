import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-confirm-approval',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule],
  templateUrl: './confirm-approval.component.html',
  styleUrl: './confirm-approval.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmApprovalComponent {
  comment: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: {requestId: number}) {
  }
}
