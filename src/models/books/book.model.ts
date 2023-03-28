import { CreateBookDto } from './create-book.model';
import { AuthorDto } from '../authors/author.model';
import { BookCatDto } from '../bookCats/bookCat.model';
export class BookDto extends CreateBookDto{
    id!: string;
   
}