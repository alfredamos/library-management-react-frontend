import { CreateAuthorDto } from "./create-author.model";

export class UpdateAuthorDto extends CreateAuthorDto {
  id!: string;
}
