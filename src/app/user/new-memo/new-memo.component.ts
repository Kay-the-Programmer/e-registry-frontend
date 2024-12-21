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
    MatInput
  ],
  templateUrl: './new-memo.component.html',
  styleUrl: './new-memo.component.css'
})

export class NewMemoComponent implements OnInit{
  memoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.memoForm = this.fb.group({
      recipients: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  recipients: Recipient[] = [
    {value: 0, viewValue: 'Directorate of Finance'},
    {value: 1, viewValue: 'Directorate of Curriculum Development'},
    {value: 2, viewValue: 'Tacos'},
  ]

  files: File[] = [
    // {fileNo: "FOO1", fileSubject: "File 1", fileTitle: "Subject1", departmentId: 0},
    // {fileNo: "FOO2", fileSubject: "File 2", fileTitle: "Subject1", departmentId: 0},
    // {fileNo: "FOO3", fileSubject: "File 3", fileTitle: "Subject1", departmentId: 0},
    // {fileNo: "FOO3", fileSubject: "File 4", fileTitle: "Subject1", departmentId: 0},
  ]

  ngOnInit(): void {}

  sendMemo(): void {
    if (this.memoForm.valid) {
      const memoData = this.memoForm.value;
      console.log('Memo Sent:', memoData);
      // Add logic to send the memo
    }
  }

  saveDraft(): void {
    const memoData = this.memoForm.value;
    console.log('Draft Saved:', memoData);
    // Add logic to save the memo as a draft
  }
}
