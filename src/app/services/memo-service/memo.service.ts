import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoService {

  private baseUrl = 'http://localhost:3000/memos/all-memos'; // The backend endpoint

  constructor(private http: HttpClient) {}

  // Fetch all memos
  getAllMemos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  private memoUrl = 'http://localhost:3000/memos';
  // Fetch a single memo by ID
  getMemoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.memoUrl}/${id}`);
  }
}
