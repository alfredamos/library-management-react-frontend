import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { BookDto } from "../../models/books/book.model";
import { bookService } from "../../services/book.service";
import { BookForm } from "../forms/books/BookForm";
import { useObservable } from '../../utility/hooks/use-observable.hook';
import { authorService } from '../../services/author.service';
import { AuthorDto } from "../../models/authors/author.model";
import { bookCatService } from "../../services/bookCat.service";
import { BookCatDto } from '../../models/bookCats/bookCat.model';

export const AddBook = (): JSX.Element => {
  const [initialValue, setInitialValue] = useState({
    id: "",
    title: "",
    isbn: "",
    edition: "",
    volume: "",
    authorId: "",
    bookCatId: "",
    publisher: "",
    quantity: 0,
    dateOfPublication: new Date(),
  } as BookDto);

  const books = useObservable(bookService.books$, [] as BookDto[]);
  const authors = useObservable(authorService.authors$, [] as AuthorDto[]);
  const categories = useObservable(bookCatService.bookCats$, [] as BookCatDto[]);

  const navigate = useNavigate();

  const handleBookSubmit = (bookDto: BookDto) => {
    bookDto.quantity = Number(bookDto.quantity);
    console.log({bookDto});
    
    bookService
      .create(bookDto)
      .pipe(
        map((book) => book as BookDto),
        tap((newBook) => {
          const bookList = [...books, newBook];
          bookService.updateBooks$(bookList);
        }),
        take(1)
      )
      .subscribe(book => navigate("/books"));
  };

  const backToList = () => {
    navigate("/books");
  };

  return (
    <BookForm
      authors={authors}
      categories={categories}
      initialValue={initialValue}
      backToList={backToList}
      onBook={handleBookSubmit}
    />
  );
}
