import { DataService, Entity } from './data.service';
import { CreateBookCatDto } from '../models/bookCats/create-bookCat.model';
import { BookCatDto } from '../models/bookCats/bookCat.model';
import { UpdateBookCatDto } from '../models/bookCats/update-bookCat.model';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';

class BookCatService extends DataService<BookCatDto> {
  private bookCatsSubject = new BehaviorSubject<BookCatDto[]>([]);
  bookCats$ = this.bookCatsSubject.asObservable();

  constructor(baseUrl: string) {
    super(baseUrl);
    this.loadBookCats();
  }

  private loadBookCats() {
    this.findAll()
      .pipe(
        map((bookCats) => bookCats as BookCatDto[]),
        tap((bookCats) => this.updateBookCats$(bookCats)),
      )
      .subscribe();
  }

  updateBookCats$(value: BookCatDto[]) {
    this.bookCatsSubject.next(value);
  }

  getBookCategories(): BookCatDto[] {
    return this.bookCatsSubject.getValue();
  }
}

const bookCatUrl = import.meta.env.VITE_BOOK_CATS_URL;

export const bookCatService = new BookCatService(bookCatUrl);