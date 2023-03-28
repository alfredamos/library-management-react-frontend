import { useParams, Link, useNavigate } from "react-router-dom";
import { ListBookDto } from "../../models/books/list-book.model";
import { bookService } from "../../services/book.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { useFindResource } from "../../utility/hooks/use-resource.hook";
import { useState } from "react";
import { tap, take } from "rxjs";
import { BookDto } from "../../models/books/book.model";
import { DeleteItem } from "../../utility/general/delete-item.util";
import { SingleDisplay } from "./SingleDisplay";

export const DetailBook = (): JSX.Element => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const books = useObservable(bookService.books$, [] as BookDto[]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { resource: book, isLoading } = useFindResource(books, id!);

  const deleteClick = () => {
    setShowDeleteItem(!showDeleteItem);
    setConfirmationTitle("Book Delete Confirmation!");
    setConfirmationMessage(`Do you want to delete book : ${book.title} ?`);
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      bookService
        .remove(id!)
        .pipe(
          tap((removedBook) => {
            const filteredBook = books.filter(
              (book) => book.id !== removedBook.id
            );
            bookService.updateBooks$(filteredBook);
            navigate("/books");
          }),
          take(1)
        )
        .subscribe();
    } else {
      navigate("/books");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleBackToList = () => {
    navigate("/books");
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
        book && (
          <SingleDisplay
            book={book}
            onBackToList={handleBackToList}
            onDelete={deleteClick}
            onEdit={handleEdit}
          />
        )
      )}
    </>
  );
}
