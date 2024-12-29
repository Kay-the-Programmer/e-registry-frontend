import {UserProfile} from "./user.model";
import {Department} from "./department.model";
import {File} from "./file.model";

export interface FileRequest {
  id: number;
  userId: number;
  reason: string;
  status: string;
  comment: string | null;
  fileNo: string;
  createdAt: string;
  updatedAt: string;
  requestedBy: {
    id: number;
    fName: string;
    lName: string;
    email: string;
    role: string;
    position: string;
    empNumber: string;
    createdAt: string;
    updatedAt: string;
    departmentId: number;
  };
  file: {
    fileNo: string;
    fileTitle: string;
    fileSubject: string;
    departmentId: number;
  };
  userDepartment: {
    id: number;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
  };
  fileDepartment: {
    id: number;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
  };
}
