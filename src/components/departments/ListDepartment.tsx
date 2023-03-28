import { Link } from "react-router-dom";
import { DepartmentDto } from "../../models/departments/department.model";
import { departmentService } from "../../services/department.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";

export const ListDepartment = (): JSX.Element => {
  const departments = useObservable(
    departmentService.departments$,
    [] as DepartmentDto[]
  );

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Department List</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table responsive table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Faculty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <td>
                    <Link
                      to={`/detail-department/${department.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {department.name}
                    </Link>
                  </td>
                  <td>{department.faculty}</td>
                  <td>
                    <Link
                      to={`/edit-department/${department.id}`}
                      className="btn btn-outline-warning m-1"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete-department/${department.id}`}
                      className="btn btn-outline-danger m-1"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link
            to="/add-department"
            className="btn btn-outline-secondary form-control m-1"
          >
            Add Department
          </Link>
        </div>
      </div>
    </div>
  );
}
