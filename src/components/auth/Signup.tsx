import { useNavigate } from "react-router-dom";
import { SignupDto } from "../../models/auth/signup.auth";
import { SignupForm } from "../forms/auth/Signup";
import { Gender } from "../../enum/gender.enum";
import { useState, useEffect } from "react";
import { map, take, tap } from "rxjs";
import { authService } from "../../services/auth.service";
import { DepartmentDto } from "../../models/departments/department.model";
import { departmentService } from "../../services/department.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { userService } from '../../services/user.service';
import { UserDto } from '../../models/users/user.model';

export const Signup = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const departments = useObservable(
    departmentService.departments$,
    [] as DepartmentDto[]
  );

  const users = useObservable(userService.users$, [] as UserDto[]);

  console.log({ departments });

  const [initialValue, setInitialValue] = useState<SignupDto>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: Gender.Male,
    departmentId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (departments) {
      setIsLoading(false);
    }
  }, []);

  const backToList = () => {
    navigate("/");
  };

  const handleSignup = (signupDto: SignupDto) => {
    console.log({ signupDto });

    authService
      .createAuth("signup", signupDto)
      .pipe(
        map(authUser => authUser.user as UserDto),
        tap(newUser => {
          const allUsers = [...users, newUser];
          userService.updateUsers$(allUsers);
        }),
        take(1))
      .subscribe((authUser) => navigate("/"));
  };

  return (
    <>
      {!isLoading && departments && (
        <SignupForm
          initialValue={initialValue}
          backToList={backToList}
          departments={departments}
          onSignup={handleSignup}
        />
      )}
    </>
  );
};
