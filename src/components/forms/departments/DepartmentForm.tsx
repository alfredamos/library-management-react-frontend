import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DepartmentDto } from '../../../models/departments/department.model';

interface DepartmentFormProp{
    initialValue: DepartmentDto;
    onDepartment: (departmentDto: DepartmentDto) => void;
    backToList: () => void;
}

export const DepartmentForm = ({backToList, initialValue, onDepartment}: DepartmentFormProp) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    faculty: yup.string().required()
  })  
  
  const {handleSubmit, register} = useForm<DepartmentDto>({
      defaultValues: initialValue,
      resolver: yupResolver(schema)
    });

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit((data) => {
          onDepartment({ ...data, id: initialValue.id });
        })}
      >
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Department Form</h4>
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
              <label htmlFor="faculty" className="form-label">
                Faculty
              </label>
              <input
                {...register("faculty")}
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
}
