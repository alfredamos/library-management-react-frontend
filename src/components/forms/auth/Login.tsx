import { useForm } from "react-hook-form";
import {  yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { LoginDto } from "../../../models/auth/login.auth";

interface LoginFormProp {
  initialValue: LoginDto;
  backToList: () => void;
  onLogin: (loginDto: LoginDto) => void;
}

export const LoginForm = ({
  initialValue,
  backToList,
  onLogin,
}: LoginFormProp): JSX.Element => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(4).max(15)
  });

  const { handleSubmit, register, reset } = useForm<LoginDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  });

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit((data) => {
        onLogin(data);
        reset();
      })}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Login Form</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="form-control"
              />
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-outline-primary form-control m-1"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary form-control m-1"
              onClick={backToList}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
