import { CreateBookDto } from "./create-book.model";
export class UpdateBookDto extends CreateBookDto {
  id!: string;
}
