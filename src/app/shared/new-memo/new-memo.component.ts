import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatOptgroup} from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { Recipient } from "../../models/recipient.model";
import { CommonModule} from "@angular/common";
import {MatInput} from "@angular/material/input";
import { File } from "../../models/file.model"
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFile, faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {MatTabsModule } from "@angular/material/tabs";
import {RequestFileComponent} from "../request-file/request-file.component";
import {MatDialog} from "@angular/material/dialog";
import {FileService} from "../../services/file-service/file.service";
import {UserService} from "../../services/user.service";
import {MemoService} from "../../services/memo-service/memo.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    MatTabsModule
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
    private snackBar: MatSnackBar
    ) {
    this.memoForm = this.fb.group({
      recipients: ['', Validators.required],
      file: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      // title: ['', Validators.required], // Add title here
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

  ngOnInit(): void {
    this.fetchFiles();
    this.getRecipients();
  }

  sendMemo(): void {
    if (this.memoForm.valid) {
      const formValue = this.memoForm.value;

      // Prepare the data object as per the API requirement
      const memoData = {
        body: formValue.body,
        fileId: formValue.file.fileNo, // Assuming `file` is an object with `fileNo`
        title: 'New Memo', // You can set a default title or ask the user for it
        subject: formValue.subject,
      };

      // Call the MemoService to send the data
      this.memoService.createMemo(memoData).subscribe({
        next: (response) => {
          this.snackBar.open('Memo sent successfully!', 'Close', { duration: 3000 });
          console.log('Memo Created:', response);
          this.memoForm.reset();
        },
        error: (err) => {
          console.error('Error creating memo:', err);
          this.snackBar.open('Failed to send memo. Please try again.', 'Close', { duration: 3000 });
        },
      });
    }else {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
    }
  }

  saveDraft(): void {
    const memoData = this.memoForm.value;
    console.log('Draft Saved:', memoData);
    // Add logic to save the memo as a draft
  }

  fetchFiles(){
    this.fileService.getAllFiles().subscribe({
      next: (response) => {
        this.files = response;
      },
      error(err){
        console.error('Error fetching files', err);
      }
    })
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
}

