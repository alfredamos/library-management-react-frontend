import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { map, tap, take } from "rxjs";
import { UserDto } from "../../models/users/user.model";
import { userService } from "../../services/user.service";
import { DeleteItem } from "../../utility/general/delete-item.util";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { useFindResource } from "../../utility/hooks/use-resource.hook";
import { SingleDisplay } from "./SingleDisplay";

export const DeleteUser = (): JSX.Element => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const users = useObservable(
    userService.users$,
    [] as UserDto[]
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const { resource: user, isLoading } = useFindResource(users, id!);

  const deleteClick = () => {
    setShowDeleteItem(!showDeleteItem);
    setConfirmationTitle("User Delete Confirmation!");
    setConfirmationMessage(
      `Do you want to delete user : ${user.name} ?`
    );
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      userService
        .remove(id!)
        .pipe(
          map((depart) => depart as UserDto),
          tap((removedUser) => {
            const filteredUser = users.filter(
              (user) => user.id !== removedUser.id
            );
            userService.updateUsers$(filteredUser);
            navigate("/users");
          }),
          take(1)
        )
        .subscribe();
    } else {
      navigate("/users");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-user/${id}`);
  };

  const handleBackToList = () => {
    navigate("/users");
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
        user && (
          <SingleDisplay
            user={user}
            onBackToList={handleBackToList}
            onDelete={deleteClick}
            onEdit={handleEdit}
          />
        )
      )}
    </>
  );
}
