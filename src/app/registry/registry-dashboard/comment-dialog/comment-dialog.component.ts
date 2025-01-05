import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {
  comment: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: {requestId: number}) {
  }
}
