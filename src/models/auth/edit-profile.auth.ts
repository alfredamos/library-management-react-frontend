import { Gender } from "../../enum/gender.enum";
import { UserType } from "../../enum/user-type.enum";

export class EditProfileDto{
    name!: string;
    email!: string;
    phone!: string;
    password!: string;
    gender?: Gender;
    userType?: UserType;
    departmentId?: string;

}