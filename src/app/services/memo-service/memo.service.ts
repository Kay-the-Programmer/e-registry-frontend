import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoService {

  private baseUrl = 'http://localhost:3000/memos'; // The backend endpoint

  constructor(private http: HttpClient) {}

  // Fetch all memos
  getAllMemos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all-memos`);
  }

  // Fetch a single memo by ID
  getMemoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }



  createMemo(memoData: {
    body: string;
    fileId: string;
    status: string;
    title: string;
    from: number;
    to: number;
    subject: string;
  }): Observable<any> {
    const url = `${this.baseUrl}/create-memo`;
    return this.http.post(url, memoData);
  }
}
