import {computed, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { File } from "../../models/file.model";
import {Department} from "../../models/department.model";

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly baseUrl = 'http://localhost:3000/files';

  constructor(private http: HttpClient) {}

  private filesSubject = new BehaviorSubject<any[]>([]);
  files$:Observable<any> = this.filesSubject.asObservable();

  /**
   * Fetch all files from the backend and update the state
   */
  setFiles(): void {
    this.getAllFiles().subscribe(files => {
      this.filesSubject.next(files);
    });
  }

  /**
   * Create a new file and update the state
   * @param file - File data to create
   * @returns Observable of the created file
   */
  addFile(file: Partial<File>): Observable<File> {
    return this.createFile(file).pipe(
      tap(newFile => {
        const currentFiles = this.filesSubject.getValue();
        this.filesSubject.next([...currentFiles, newFile]);
      })
    );
  }
  /**
   * Create a new file
   * @param file - File data to create
   * @returns Observable of the created file
   */
  createFile(file: Partial<File>): Observable<File> {
    return this.http.post<File>(`${this.baseUrl}/create-file`, file);
  }

  /**
   * Update an existing file
   * @param fileId - ID of the file to update
   * @param updatedData - Updated file data
   * @returns Observable of the updated file
   */
  updateFile(fileId: string, updatedData: { fileTitle: string; fileSubject: string; departmentId: number }): Observable<File> {
    const payload = {
      id: fileId,
      fileNo: fileId, // Ensure fileNo is included
      fileTitle: updatedData.fileTitle,
      fileSubject: updatedData.fileSubject,
      departmentId: updatedData.departmentId
    };

    console.log('Sending payload to backend:', payload); // Debug log to confirm payload

    return this.http.patch<File>(`http://localhost:3000/files/update-file`, payload);
  }

  /**
   * Get all files
   * @returns Observable of the list of all files
   */
  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(`${this.baseUrl}/get-all-files`);
  }

  /**
   * Get a file by its ID
   * @param fileId - ID of the file to retrieve
   * @returns Observable of the file
   */
  getFileById(fileId: string): Observable<File> {
    return this.http.get<File>(`${this.baseUrl}/get-file-by-id/${fileId}`);
  }


  /**
   * Delete a file by its ID
   * @param fileId - ID of the file to delete
   * @returns Observable of the deletion result
   */
  deleteFile(fileId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-file/${fileId}`);
  }

  departmentBaseUrl = 'http://localhost:3000/dept';
  /** Fetch department details by its ID */
  getDepartmentById(departmentId: number): Observable<Department> {
    return this.http.get<Department>(`/dept/${departmentId}`);
  }

  /**
   * Get all departments
   * @returns Observable of the list of all departments
   */
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.departmentBaseUrl}/getAllDepartments`);
  }

  addUserToFile(fileId: string, userId: number): Observable<any> {
    const url = `${this.baseUrl}/add-user-to-file/${fileId}/${userId}`;
    return this.http.patch(url, null); // Sending PATCH request with
  }

  removeUserFromFile(fileId: string, userId: number): Observable<any> {
    const url = `${this.baseUrl}/remove-user-from-file/${fileId}/${userId}`;
    return this.http.delete(url);
  }

  getUserAssignedFiles(userId: number): Observable<any> {
    const url = `${this.baseUrl}/get-user-assigned-files/${userId}`;
    return this.http.get<any>(url);
  }

  getFileStats(fileNo: string): Observable<any> {
    const url = `${this.baseUrl}/get-file-stats/${fileNo}`;
    return this.http.get<any>(url);
  }


}
