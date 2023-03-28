import { Gender } from "../../enum/gender.enum";
import { UserType } from "../../enum/user-type.enum";
import { DepartmentDto } from "../departments/department.model";

export class CurrentUserDto {
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
  gender!: Gender;
  department?: DepartmentDto;
  departmentId?: string;
  userType?: UserType;
}
