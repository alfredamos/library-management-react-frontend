import { UpdateAuthorDto } from "./../models/authors/update-author.model";
import { AuthorDto } from "../models/authors/author.model";
import { CreateAuthorDto } from "./../models/authors/create-author.model";
import { DataService, Entity } from "./data.service";
import { BehaviorSubject, map, tap } from "rxjs";

class AuthorService extends DataService<AuthorDto> {
  private authorsSubject = new BehaviorSubject<AuthorDto[]>([]);
  authors$ = this.authorsSubject.asObservable();

  constructor(baseUrl: string) {
    super(baseUrl);
    this.loadAuthors();
  }

  private loadAuthors() {
    this.findAll()
      .pipe(
        map((authors) => authors as AuthorDto[]),
        tap((authors) => {
          console.log("in AuthorService, authors : ", authors);

          this.updateAuthors$(authors);
        })
      )
      .subscribe();
  }

  updateAuthors$(value: AuthorDto[]): void {
    this.authorsSubject.next(value);
  }

  getAuthors(): AuthorDto[] {
    return this.authorsSubject.getValue();
  }
}

const authorsUrl = import.meta.env.VITE_AUTHORS_URL as string;

export const authorService = new AuthorService(authorsUrl);
