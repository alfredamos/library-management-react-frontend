import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupDto } from "../../../models/auth/signup.auth";
import { DepartmentDto } from "../../../models/departments/department.model";

interface SignupFormProp {
  initialValue: SignupDto;
  departments: DepartmentDto[];
  backToList: () => void;
  onSignup: (signupDto: SignupDto) => void;
}

export const SignupForm = ({
  initialValue,
  backToList,
  departments,
  onSignup,
}: SignupFormProp): JSX.Element => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    password: yup.string().required().min(6).max(15),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null!]),
    gender: yup.string().required(),
    departmentId: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignupDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit((data) => {
          onSignup(data);
          reset();
        })}
      >
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Signup Form</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input {...register("name")} className="form-control" />
              <p className="alert-danger">{errors.name?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input {...register("email")} className="form-control" />
              <p className="alert-danger">{errors.email?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input {...register("phone")} className="form-control" />
              <p className="alert-danger">{errors.phone?.message}</p>
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
              <p className="alert-danger">{errors.password?.message}</p>
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
              <p className="alert-danger">{errors.confirmPassword?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select {...register("gender")} className="form-select">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <p className="alert-danger">{errors.gender?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="departmentId" className="form-label">
                Department
              </label>
              <select {...register("departmentId")} className="form-select">
                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={department.id}
                    id={department.id}
                  >{department.name}</option>
                ))}
              </select>
              <p className="alert-danger">{errors.departmentId?.message}</p>
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
