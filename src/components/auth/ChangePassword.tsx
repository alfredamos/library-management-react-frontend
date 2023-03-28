import { useNavigate } from "react-router-dom";
import { ChangePasswordDto } from "../../models/auth/change-password.auth";
import { ChangePasswordForm } from "../forms/auth/ChangePassword";
import { authService } from "../../services/auth.service";
import { map, take, tap } from "rxjs";
import { CurrentUserDto } from "../../models/auth/current-user.auth";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { useState, useEffect } from "react";
import { userService } from "../../services/user.service";
import { UserDto } from "../../models/users/user.model";

export const ChangePassword = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const users = useObservable(userService.users$, [] as UserDto[]);


  const currentUser = useObservable(
    authService.currentUser$,
    {} as CurrentUserDto
  );

  const changePassword: ChangePasswordDto = {
    email: currentUser.email,
    password: "",
    newPassword: "",
    confirmPassword: ""
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, []);

  const backToList = () => {
    navigate("/");
  };

  const handleChangePassword = (changePasswordDto: ChangePasswordDto) => {
    console.log({ changePasswordDto });

    authService
      .updateAuth("change-password", changePasswordDto)
      .pipe(map(authUser => authUser.user as UserDto), 
            tap(editedUser => {
            const updatedUsers = users.map(user => user.id === editedUser?.id ? editedUser : user );
            userService.updateUsers$(updatedUsers);
      }),
      take(1))
      .subscribe((authUser) => navigate("/"));
  };

  return (
    <>
      {!isLoading && changePassword.email && (
        <ChangePasswordForm
          initialValue={changePassword}
          backToList={backToList}
          onChangePassword={handleChangePassword}
        />
      )}
    </>
  );
};
