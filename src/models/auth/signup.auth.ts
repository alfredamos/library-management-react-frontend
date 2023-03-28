import { Gender } from "../../enum/gender.enum";
import { UserType } from "../../enum/user-type.enum";

export class SignupDto {
  name!: string;
  email!: string;
  phone!: string;
  password!: string;
  confirmPassword!: string;
  gender?: Gender;
  userType?: UserType;
  departmentId?: string;
}
