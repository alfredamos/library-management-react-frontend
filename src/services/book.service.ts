import { DataService, Entity } from "./data.service";
import { CreateBookDto } from "../models/books/create-book.model";
import { BookDto } from "../models/books/book.model";
import { UpdateBookDto } from "../models/books/update-book.model";
import { BehaviorSubject, map, shareReplay, tap } from "rxjs";

class BookService extends DataService<BookDto> {
  private booksSubject = new BehaviorSubject<BookDto[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(baseUrl: string) {
    super(baseUrl);
    this.loadBooks();
  }

  private loadBooks() {
    this.findAll()
      .pipe(
        map((books) => books as BookDto[]),
        tap((books) => this.updateBooks$(books)),
      )
      .subscribe();
  }

  updateBooks$(value: BookDto[]) {
    this.booksSubject.next(value);
  }

  getBooks(): BookDto[] {
    return this.booksSubject.getValue();
  }
}

const bookUrl = import.meta.env.VITE_BOOKS_URL;

export const bookService = new BookService(bookUrl);
