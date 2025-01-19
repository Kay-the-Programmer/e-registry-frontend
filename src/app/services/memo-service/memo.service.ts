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

  // Fetch user memos
  getUserMemos(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-user-memos/${userId}`);
  }

  // Fetch a single memo by ID
  getMemoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  //Fetch memo forwarded to user
  getMemoForwardedToUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-memos-forwarded-to-user/${userId}`);
  }

  createMemo(memoData: {
    subject: string;
    from: number;
    to: number;
    body: string;
    title: string;
    fileId: string;
    status: string;
  }): Observable<any> {
    const url = `${this.baseUrl}/create-memo`;
    return this.http.post(url, memoData);
  }

  forwardMemo(forwardData: {
    forwardedById: number;
    forwardedToId: string;
    memoId: number;
    comment: any;
    status: string
  }): Observable<any> {
    const url = `${this.baseUrl}/forward-memo`;
    return this.http.post(url, forwardData);
  }

  updateMemo(
    memoId: number,
    updateData: {
      body: string;
      fileId: string;
      status: string;
      title: string;
      from: number;
      to: number;
      subject: string;
      isDraft: boolean;
      isRead: boolean;
    }
  ): Observable<any> {
    const url = `${this.baseUrl}/update-memo/${memoId}`;
    return this.http.patch(url, updateData);
  }


  deleteMemo(memoId: number): Observable<any> {
    const url = `${this.baseUrl}/delete-memo/${memoId}`;
    return this.http.delete(url);
  }
}
