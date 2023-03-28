import { LoginForm } from "../forms/auth/Login";
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '../../models/auth/login.auth';
import { useState} from 'react';
import { authService } from "../../services/auth.service";
import { tap, take } from 'rxjs';


export const Login = (): JSX.Element => {
  const [initialValue, setInitialValue] = useState<LoginDto>({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const backToList = () => {
    navigate("/");
  }

  const handleLogin = (loginDto: LoginDto) => {
    console.log({loginDto});

  authService
    .createAuth("login", loginDto)
    .pipe(
      tap((authUser) => authService.login(authUser)),
      take(1)
    )
    .subscribe(authUser => 
      navigate('/')
    );
         
  }

  return (
    <LoginForm
      initialValue={initialValue}
      backToList={backToList}
      onLogin={handleLogin}
    />
  );
};
