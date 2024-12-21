import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {Router} from "express";
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private toggleSubject = new Subject<void>();
  toggle$ = this.toggleSubject.asObservable();

  toggleDrawer() {
    this.toggleSubject.next();
    console.log("DrawerService.toggleDrawer was called");
  }
}
