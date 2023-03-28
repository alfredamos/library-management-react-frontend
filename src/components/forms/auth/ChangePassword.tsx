import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ChangePasswordDto } from "../../../models/auth/change-password.auth";

interface ChangePasswordFormProp {
  initialValue: ChangePasswordDto
  backToList: () => void;
  onChangePassword: (changePasswordDto: ChangePasswordDto) => void;
}

export const ChangePasswordForm = ({
  initialValue,
  backToList,
  onChangePassword,
}: ChangePasswordFormProp): JSX.Element => {

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(15),
    newPassword: yup.string().required().min(6).max(15),
    confirmPassword: yup
      .string()
      .required()
      .min(6)
      .max(15)
      .oneOf([yup.ref("newPassword"), null!]),
  });

  const { handleSubmit, register, reset } = useForm<ChangePasswordDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  });

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit((data) => {
          onChangePassword(data);
          reset();
        })}
      >
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Change Password Form</h4>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
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
