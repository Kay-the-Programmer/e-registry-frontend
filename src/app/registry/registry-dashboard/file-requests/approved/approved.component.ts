import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {FileRequest} from "../../../../models/file.request.model";
import {FileRequestService} from "../../../../services/file-request-service/file-request.service";
import {NgForOf, NgIf} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-approved',
  standalone: true,
  imports: [MatTableModule, NgIf, MatAccordion, MatButton, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle, NgForOf],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent implements OnInit{
  fileRequests: FileRequest[] = [];
  constructor(
    private fileRequestService: FileRequestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchFileRequests();
  }

  fetchFileRequests(): void {
    this.fileRequestService.fetchRequestsByStatus('Successful').subscribe({
      next: (requests) => {
        this.fileRequests = requests;
      },
      error: (err) => {
        console.error('Error fetching approved requests:', err);
      },
    });
  }
}
