import { CreateUserDto } from "./create-user.model";
export class UpdateUserDto extends CreateUserDto {
  id!: string;
}
