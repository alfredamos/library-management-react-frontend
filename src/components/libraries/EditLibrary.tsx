import { useNavigate, useParams } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { BookDto } from "../../models/books/book.model";
import { LibraryDto } from "../../models/libraries/library.model";
import { UserDto } from "../../models/users/user.model";
import { bookService } from "../../services/book.service";
import { libraryService } from "../../services/library.service";
import { userService } from "../../services/user.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { LibraryForm } from "../forms/Libraries/LibraryForm";
import { useFindResource } from "../../utility/hooks/use-resource.hook";

export const EditLibrary = (): JSX.Element => {
  const { id } = useParams();

  const books = useObservable(bookService.books$, [] as BookDto[]);

  const libraries = useObservable(
    libraryService.libraries$,
    [] as LibraryDto[]
  );

  const users = useObservable(userService.users$, [] as UserDto[]);

  const navigate = useNavigate();

  const { resource: library, isLoading } = useFindResource<LibraryDto>(
    libraries,
    id!
  );

  const handleLibrarySubmit = (libraryDto: LibraryDto) => {
    libraryService
      .create(libraryDto)
      .pipe(
        map((libraryL) => libraryL as LibraryDto),
        tap((editedLibrary) => {
          const updatedLibraries = libraries.map((library) =>
            library.id === editedLibrary.id ? editedLibrary : library
          );

          libraryService.updateLibraries$(updatedLibraries);
        }),
        take(1)
      )
      .subscribe((lib) => navigate("/"));
  };

  const backToList = () => {
    navigate("/");
  };

  return (
    <>
      {!isLoading && library && (
        <LibraryForm
          books={books}
          users={users}
          initialValue={library}
          backToList={backToList}
          onLibrary={handleLibrarySubmit}
        />
      )}
    </>
  );
};
