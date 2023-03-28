import { UserType } from "../../enum/user-type.enum";
import { CurrentUserDto } from './current-user.auth';

export class AuthUser{
    id!: string;
    name!: string;
    userType?: UserType;
    token?: string;
    message?: string;
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    user?: CurrentUserDto;
}