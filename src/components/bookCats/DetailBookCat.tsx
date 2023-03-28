import { useParams, Link, useNavigate } from "react-router-dom";
import { BookCatDto } from "../../models/bookCats/bookCat.model";
import { bookCatService } from "../../services/bookCat.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { useFindResource } from "../../utility/hooks/use-resource.hook";
import { useState } from "react";
import { tap, take } from "rxjs";
import { DeleteItem } from "../../utility/general/delete-item.util";
import { SingleDisplay } from "./SingleDisplay";

export const DetailBookCat = (): JSX.Element => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const categories = useObservable(
    bookCatService.bookCats$,
    [] as BookCatDto[]
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const { resource: bookCat, isLoading } = useFindResource(categories, id!);

  const deleteClick = () => {
    setShowDeleteItem(!showDeleteItem);
    setConfirmationTitle("BookCat Delete Confirmation!");
    setConfirmationMessage(`Do you want to delete bookCat : ${bookCat.name} ?`);
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      bookCatService
        .remove(id!)
        .pipe(
          tap((removedBookCat) => {
            const filteredBookCat = categories.filter(
              (bookCat) => bookCat.id !== removedBookCat.id
            );
            bookCatService.updateBookCats$(filteredBookCat);
            navigate("/categories");
          }),
          take(1)
        )
        .subscribe();
    } else {
      navigate("/categories");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-bookCat/${id}`);
  };

  const handleBackToList = () => {
    navigate("/categories");
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
        bookCat && (
          <SingleDisplay
            bookCat={bookCat}
            onBackToList={handleBackToList}
            onDelete={deleteClick}
            onEdit={handleEdit}
          />
        )
      )}
    </>
  );
}
