import {Department} from "./department.model";

export interface File {
  fileNo: string;
  fileTitle: string;
  fileSubject: string;
  departmentId: number;
}
