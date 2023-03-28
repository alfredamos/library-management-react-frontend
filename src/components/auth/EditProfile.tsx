import { EditProfileForm } from "../forms/auth/EditProfile";
import { useNavigate } from "react-router-dom";
import { EditProfileDto } from "../../models/auth/edit-profile.auth";
import { authService } from "../../services/auth.service";
import { map, take, tap } from "rxjs";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { departmentService } from "../../services/department.service";
import { DepartmentDto } from "../../models/departments/department.model";
import { CurrentUserDto } from "../../models/auth/current-user.auth";
import { useState, useEffect } from "react";
import { userService } from '../../services/user.service';
import { UserDto } from '../../models/users/user.model';

export const EditProfile = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const users = useObservable(userService.users$, [] as UserDto[]);

  const currentUser = useObservable(
    authService.currentUser$,
    {} as CurrentUserDto
  );

  const editProfile = { ...currentUser, password: "" };

  useEffect(() => {
    if (editProfile) {
      setIsLoading(false);
    }
  }, []);

  console.log({ editProfile });

  const departments = useObservable(
    departmentService.departments$,
    [] as DepartmentDto[]
  );

  const navigate = useNavigate();

  const backToList = () => {
    navigate("/");
  };

  const handleEditProfile = (editProfileDto: EditProfileDto) => {
    console.log({ editProfileDto });

    authService
      .updateAuth("edit-profile", editProfileDto)
      .pipe(
        map(authUser => authUser.user as UserDto),
        tap(editedUser => {
          const updatedUsers = users.map(user => user.id === editedUser?.id ? editedUser : user);
          userService.updateUsers$(updatedUsers);        
        }),
        take(1))
      .subscribe((authUser) => navigate("/"));
  };

  return (
    <>
      {!isLoading && editProfile && (
        <EditProfileForm
          departments={departments}
          initialValue={editProfile}
          backToList={backToList}
          onEditProfile={handleEditProfile}
        />
      )}
    </>
  );
};
