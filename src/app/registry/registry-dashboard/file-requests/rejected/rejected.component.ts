import {Component, OnInit} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {NgForOf, NgIf} from "@angular/common";
import {FileRequest} from "../../../../models/file.request.model";
import {FileRequestService} from "../../../../services/file-request-service/file-request.service";

@Component({
  selector: 'app-rejected',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NgForOf,
    NgIf
  ],
  templateUrl: './rejected.component.html',
  styleUrl: './rejected.component.css'
})
export class RejectedComponent implements OnInit{
  fileRequests: FileRequest[] = [];
  constructor(private fileRequestService: FileRequestService) {}

  ngOnInit(): void {
    this.fetchFileRequests();
  }

  fetchFileRequests(): void {
    this.fileRequestService.fetchRequestsByStatus('Rejected').subscribe({
      next: (data) => {
        this.fileRequests = data;
      },
      error: (err) => console.error('Error fetching file requests:', err),
    });
  }
}
