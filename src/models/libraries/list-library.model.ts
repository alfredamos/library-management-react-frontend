import { CreateLibraryDto } from './create-library.model';
import { BookDto } from '../books/book.model';
import { UserDto } from '../users/user.model';

export class ListLibraryDto extends CreateLibraryDto{
    id!: string;
    book?: BookDto;
    user?: UserDto;
}