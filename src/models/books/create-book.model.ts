import { AuthorDto } from "../authors/author.model";
import { BookCatDto } from "../bookCats/bookCat.model";
export class CreateBookDto {
  isbn!: string;
  title!: string;
  publisher!: string;
  edition!: string;
  volume!: string;
  bookCatId!: string;
  quantity!: number;
  dateOfPublication!: Date;
  authorId!: string;
}
