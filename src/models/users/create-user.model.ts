import { Gender } from "../../enum/gender.enum";
import { UserType } from "../../enum/user-type.enum";
import { DepartmentDto } from '../departments/department.model';

export class CreateUserDto{
    name!: string;
    email!: string;
    phone!: string;
    password!: string;
    confirmPassword!: string;
    departmentId!: string;
    userType!: UserType;
    gender!: Gender;
    department?: DepartmentDto
}