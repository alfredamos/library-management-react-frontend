import { CreateBookCatDto } from "./create-bookCat.model";

export class UpdateBookCatDto extends CreateBookCatDto {
  id!: string;
}
