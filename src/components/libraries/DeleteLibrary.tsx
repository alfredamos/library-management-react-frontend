import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { map, tap, take } from "rxjs";
import { LibraryDto } from "../../models/libraries/library.model";
import { libraryService } from "../../services/library.service";
import { DeleteItem } from "../../utility/general/delete-item.util";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { useFindResource } from "../../utility/hooks/use-resource.hook";
import { SingleDisplay } from "./SingleDisplay";
import { ListLibraryDto } from '../../models/libraries/list-library.model';

export const DeleteLibrary = (): JSX.Element => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const libraries = useObservable(libraryService.libraries$, [] as LibraryDto[]) as ListLibraryDto[];

  const { id } = useParams();
  const navigate = useNavigate();

  const { resource: library, isLoading } = useFindResource(libraries, id!);

  const deleteClick = () => {
    setShowDeleteItem(!showDeleteItem);
    setConfirmationTitle("Library Delete Confirmation!");
    setConfirmationMessage(`Do you want to delete library request by : ${library.user?.name} for the book : ${library.book?.title} ?`);
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      libraryService
        .remove(id!)
        .pipe(
          map((depart) => depart as LibraryDto),
          tap((removedLibrary) => {
            const filteredLibrary = libraries.filter(
              (library) => library.id !== removedLibrary.id
            );
            libraryService.updateLibraries$(filteredLibrary);
            navigate("/libraries");
          }),
          take(1)
        )
        .subscribe();
    } else {
      navigate("/");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-library/${id}`);
  };

  const handleBackToList = () => {
    navigate("/");
  };

  return (
    <>
      {showDeleteItem ? (
        <DeleteItem
          submitButton="Delete"
          cancelButton="Back"
          deleteTitle={confirmationTitle}
          deleteMessage={confirmationMessage}
          deleteItem={handleDelete}
        />
      ) : (
        !isLoading &&
        library && (
          <SingleDisplay
            library={library}
            onBackToList={handleBackToList}
            onDelete={deleteClick}
            onEdit={handleEdit}
          />
        )
      )}
    </>
  );
}
