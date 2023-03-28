import { useObservable } from "../../utility/hooks/use-observable.hook";
import { authorService } from "../../services/author.service";
import { AuthorDto } from "../../models/authors/author.model";
import { useParams, useNavigate } from "react-router-dom";
import { useFindResource } from "../../utility/hooks/use-resource.hook";
import { SingleDisplay } from "./SingleDisplay";
import { DeleteItem } from "../../utility/general/delete-item.util";
import { take, tap } from "rxjs";
import { useState } from "react";

export const DetailAuthor = (): JSX.Element => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const authors = useObservable(authorService.authors$, [] as AuthorDto[]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { resource: author, isLoading } = useFindResource(authors, id!);

  const deleteClick = () => {
    setShowDeleteItem(!showDeleteItem);
    setConfirmationTitle("Author Delete Confirmation!");
    setConfirmationMessage(`Do you want to delete author : ${author.name} ?`);
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      authorService
        .remove(id!)
        .pipe(
          tap((removedAuthor) => {
            const filteredAuthor = authors.filter(
              (author) => author.id !== removedAuthor.id
            );
            authorService.updateAuthors$(filteredAuthor);
            navigate("/authors");
          }),
          take(1)
        )
        .subscribe();
    } else {
      navigate("/authors");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-author/${id}`);
  };

  const handleBackToList = () => {
    navigate("/authors");
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
        author && (
          <SingleDisplay
            author={author}
            onBackToList={handleBackToList}
            onDelete={deleteClick}
            onEdit={handleEdit}
          />
        )
      )}
    </>
  );
};
