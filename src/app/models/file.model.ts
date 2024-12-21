import {Department} from "./department.model";

export interface File {
  id: string;
  fileNo: string;
  fileTitle: string;
  fileSubject: string;
  departmentId: number;
  Department: Department;
}
