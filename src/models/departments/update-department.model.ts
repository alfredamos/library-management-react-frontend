import { CreateDepartmentDto } from "./create-department.model";

export class UpdateDepartmentDto extends CreateDepartmentDto {
  id!: string;
}
