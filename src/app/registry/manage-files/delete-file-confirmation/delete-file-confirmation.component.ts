import {ChangeDetectionStrategy, Component, Inject, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogModule
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-file-confirmation',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule],
  templateUrl: './delete-file-confirmation.component.html',
  styleUrl: './delete-file-confirmation.component.css'
})
export class DeleteFileConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFileConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
