import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MemoService } from '../../../services/memo-service/memo.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {formatDate, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-forward-memo-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './forward-memo-dialog.component.html',
  styleUrls: ['./forward-memo-dialog.component.css'],
})
export class ForwardMemoDialogComponent implements OnInit {
  allUsers: any[] = [];
  currentUser!: number;
  selectedValue!: string;

  forwardForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForwardMemoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memoId: number },
    private userService: UserService,
    private memoService: MemoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Initialize the form with validation
    this.forwardForm = this.fb.group({
      selectedUserId: [null, Validators.required],
      comment: ['', Validators.maxLength(250)], // Comment optional, but limited to 250 chars
    });
  }

  ngOnInit(): void {
    this.fetchAvailableUsers();
    this.fetchCurrentUserId();
  }

  // Fetch and set the current user ID
  fetchCurrentUserId(): void {
    const userToken = sessionStorage.getItem('authToken');
    if (userToken) {
      const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
      this.currentUser = decodedToken.userId;

      console.log(this.currentUser, "Current User");
    }
  }

  // Fetch all available users
  fetchAvailableUsers(): void {
    this.userService.fetchUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  // Handle the forward action
  // selectedUserId: any;
  onForward(): void {
    if (this.forwardForm.invalid) {
      console.warn('Form is invalid!');
      return;
    }

    console.log(this.forwardForm.value);

    const formValue = this.forwardForm.value;

    const forwardData = {
      forwardedById: this.currentUser,
      forwardedToId: this.selectedValue,
      memoId: this.data.memoId,
      comment: formValue.comment,
      status: 'pending',
    };

    console.log(forwardData)
    this.memoService.forwardMemo(forwardData).subscribe({
      next: (response) => {
        console.log('Memo forwarded successfully:', response);
        this.dialogRef.close({ success: true });
        this.snackBar.open('Memo forwarded successfully!', 'Close', { duration: 3000,
        horizontalPosition: 'left', verticalPosition: 'bottom' });
      },
      error: (err) => {
        console.error('Error forwarding memo:', err);
      },
    });
  }
}
