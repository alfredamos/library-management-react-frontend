import { DataService } from "./data.service";
import { CreateLibraryDto } from "../models/libraries/create-library.model";
import { LibraryDto } from "../models/libraries/library.model";
import { UpdateLibraryDto } from "../models/libraries/update-library.model";
import { BehaviorSubject, map, shareReplay, tap } from "rxjs";

//type Library = CreateLibraryDto | LibraryDto | UpdateLibraryDto;

class LibraryService extends DataService<LibraryDto> {
  private librariesSubject = new BehaviorSubject<LibraryDto[]>([]);
  libraries$ = this.librariesSubject.asObservable();

  constructor(baseUrl: string) {
    super(baseUrl);
    this.loadLibraries();
  }

  private loadLibraries() {
    this.findAll()
      .pipe(
        map((libraries) => libraries as LibraryDto[]),
        tap((libraries) => this.updateLibraries$(libraries)),
        //shareReplay(1)
      )
      .subscribe();
  }

  updateLibraries$(value: LibraryDto[]) {
    this.librariesSubject.next(value);
  }

  getLibraries() {
    return this.librariesSubject.getValue();
  }
}

const libraryUrl = import.meta.env.VITE_LIBRARIES_URL;

export const libraryService = new LibraryService(libraryUrl);
