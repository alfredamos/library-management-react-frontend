import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditProfileDto } from "../../../models/auth/edit-profile.auth";
import { DepartmentDto } from "../../../models/departments/department.model";

interface EditProfileFormProp {
  initialValue: EditProfileDto;
  departments: DepartmentDto[];
  backToList: () => void;
  onEditProfile: (editProfileDto: EditProfileDto) => void;
}

export const EditProfileForm = ({
  initialValue,
  backToList,
  departments,
  onEditProfile,
}: EditProfileFormProp): JSX.Element => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    password: yup.string().required().min(6).max(15),
    gender: yup.string().required(),
    departmentId: yup.string().required()
  });

  const { handleSubmit, register, reset } = useForm<EditProfileDto>({defaultValues: initialValue, resolver: yupResolver(schema)});

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("In edit-form, data : ", data);
          onEditProfile(data);
          reset();
        })}
      >
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Edit Profile Form</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                {...register("name")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone")}
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
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                typeof="enum"
                {...register("gender")}
                className="form-select"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="departmentId" className="form-label">
                Department
              </label>
              <select
                {...register("departmentId")}
                className="form-select"
              >
                <option>Please Select Department</option>
                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={department.id}
                    id={department.id}
                  >
                    {department.name}
                  </option>
                ))}
              </select>
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
