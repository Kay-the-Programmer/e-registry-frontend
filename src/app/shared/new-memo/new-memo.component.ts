import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {QuillModule,} from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptgroup} from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule} from "@angular/common";
import { MatInput} from "@angular/material/input";
import { File } from "../../models/file.model"
import { FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFile, faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { MatTabsModule } from "@angular/material/tabs";
import { RequestFileComponent} from "../request-file/request-file.component";
import { MatDialog} from "@angular/material/dialog";
import { FileService} from "../../services/file-service/file.service";
import { UserService} from "../../services/user.service";
import { MemoService} from "../../services/memo-service/memo.service";
import { MatSnackBar} from "@angular/material/snack-bar";
import { MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-new-memo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    QuillModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptgroup,
    MatSelectModule,
    CommonModule,
    MatInput,
    FaIconComponent,
    MatTabsModule,
    MatToolbar
  ],
  templateUrl: './new-memo.component.html',
  styleUrl: './new-memo.component.css'
})

export class NewMemoComponent implements OnInit{
  memoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private fileService: FileService,
    private userService: UserService,
    private memoService: MemoService,
    private snackBar: MatSnackBar,
    ) {
    this.memoForm = this.fb.group({
      recipients: ['', Validators.required],
      file: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  openRequestFileDialog(): void {
    const dialogRef = this.dialog.open(RequestFileComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('File requested:', result);
        // Handle the requested file logic
      }
    });
  }

  recipients: any[] = [];

  files: File[] = [];

  userId!: number;

  ngOnInit(): void {
    this.fetchFiles();
    this.getRecipients();
  }

  fetchFiles() {
    const userToken = sessionStorage.getItem('authToken');
    if (userToken) {
      const decodedToken = JSON.parse(atob(userToken.split('.')[1]));  // Decode JWT token
      this.userId = decodedToken.userId;

      this.fileService.getUserAssignedFiles(this.userId).subscribe({
        next: (response) => {
          this.files = response;
        },
        error: (err) => {
          console.error('Error fetching files', err);
        },
      });
    }
  }

  sendMemo(): void {
    if (this.memoForm.valid) {
      const formValue = this.memoForm.value;
      const memoData = {
        body: formValue.body,  // Use body form control
        fileId: formValue.file?.fileNo,
        // Get selected file's 'fileNo'
        status: 'Pending',
        title: formValue.subject,  // Subject can be the title
        from: this.userId,
        to: formValue.recipients?.id,
        subject: formValue.subject,
      };

      console.log("Memo data", memoData)
      console.log("form data", formValue)


      this.memoService.createMemo(memoData).subscribe({
        next: (response) => {
          console.log('Memo created successfully:', response);
          this.snackBar.open('Memo created successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error creating memo:', err);
          this.snackBar.open('Error creating memo. Please try again.', 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      console.error('Form is invalid');
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
      });
    }
  }

  saveDraft(): void {
    const memoData = this.memoForm.value;
    console.log('Draft Saved:', memoData);
    // Add logic to save the memo as a draft
  }




  getRecipients(){
    this.userService.fetchUsers().subscribe({
      next: (recipients) => {
        this.recipients = recipients;
      },
      error(err){
        console.error('Error fetching recipients', err);
      }
    })
  }

  protected readonly faPaperclip = faPaperclip;
  protected readonly faFile = faFile;

  editorModules = {
    toolbar: [
      // Specify toolbar options
      [{ header: [1, 2, 3, false] }], // Header dropdown
      ['bold', 'italic', 'underline'], // Text formatting
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      [{ align: [] }], // Alignment
      ['link', 'image'], // Insert options
      ['clean'], // Clear formatting
    ],
  };
  protected readonly faPaperPlane = faPaperPlane;
}

