import { useNavigate, useParams } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { AuthorDto } from "../../models/authors/author.model";
import { BookDto } from "../../models/books/book.model";
import { authorService } from "../../services/author.service";
import { bookCatService } from "../../services/bookCat.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { BookForm } from "../forms/books/BookForm";
import { bookService } from "../../services/book.service";
import { BookCatDto } from "../../models/bookCats/bookCat.model";
import { useFindResource } from "../../utility/hooks/use-resource.hook";

export const EditBook = (): JSX.Element => {
  const { id } = useParams();

  const books = useObservable(bookService.books$, [] as BookDto[]);

  const authors = useObservable(authorService.authors$, [] as AuthorDto[]);
  const categories = useObservable(
    bookCatService.bookCats$,
    [] as BookCatDto[]
  );

  const navigate = useNavigate();

  const { resource: book, isLoading } = useFindResource<BookDto>(
    books,
    id!
  );

  const handleBookSubmit = (bookDto: BookDto) => {
    bookService
      .create(bookDto)
      .pipe(
        map((bookL) => bookL as BookDto),
        tap((editedBook) => {
          const updatedBooks = books.map(book => book.id === editedBook.id ? editedBook : book)          
          bookService.updateBooks$(updatedBooks);
        }),
        take(1)
      )
      .subscribe((book) => navigate("/books"));
  };

  const backToList = () => {
    navigate("/books");
  };

  return (
    <>
      {!isLoading && book && (
        <BookForm
          authors={authors}
          categories={categories}
          initialValue={book}
          backToList={backToList}
          onBook={handleBookSubmit}
        />
      )}
    </>
  );
};
