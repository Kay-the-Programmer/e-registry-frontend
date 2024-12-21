import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Department} from "../models/department.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentMap: { [key: number]: string } = {};

  private apiUrl = 'http://localhost:3000/dept/';

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getAllDepartments`);
  }

  createDepartment(department: Partial<Department>): Observable<Department> {
    return this.http.post<Department>(`/dept/create/${department.departmentName}`, department);
  }


}
