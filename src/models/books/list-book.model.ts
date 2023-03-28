import { AuthorDto } from '../authors/author.model';
import { BookCatDto } from '../bookCats/bookCat.model';
import { BookDto } from './book.model';

export class ListBookDto extends BookDto {
  author?: AuthorDto;
  category?: BookCatDto;
}