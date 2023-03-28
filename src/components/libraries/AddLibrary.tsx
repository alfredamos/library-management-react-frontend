import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { LibraryDto } from "../../models/libraries/library.model";
import { libraryService } from "../../services/library.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { LibraryForm } from "../forms/Libraries/LibraryForm";
import { Category } from '../../enum/category.enum';
import { bookService } from "../../services/book.service";
import { BookDto } from "../../models/books/book.model";
import { userService } from "../../services/user.service";
import { UserDto } from "../../models/users/user.model";

export const AddLibrary = (): JSX.Element => {
  const [initialValue, setInitialValue] = useState<LibraryDto>({
    id: "",
    requesterCategory: Category.Student,
    bookId: "",
    userId: ""
  });

  const libraries = useObservable(libraryService.libraries$, [] as LibraryDto[]);

  const books = useObservable(
    bookService.books$,
    [] as BookDto[]
  );
  
  const users = useObservable(
    userService.users$,
    [] as UserDto[]
  );

  const navigate = useNavigate();

  const handleLibrarySubmit = (libraryDto: LibraryDto) => {
    libraryService.create(libraryDto).pipe(
      map(library => library as LibraryDto),
      tap(newLibrary => {
        const libraryList = [...libraries, newLibrary];
        libraryService.updateLibraries$(libraryList);
      }),
      take(1)
    ).subscribe(lib => navigate("/"));
  };

  const backToList = () => {
    navigate("/");
  };

  return (
    <LibraryForm
      books={books}
      users={users}
      initialValue={initialValue}
      backToList={backToList}
      onLibrary={handleLibrarySubmit}
    />
  );
}
