import { Link } from "react-router-dom";
import { UserDto } from "../../models/users/user.model";
import { userService } from "../../services/user.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";

export const ListUser = (): JSX.Element => {
  const users = useObservable(userService.users$, [] as UserDto[]) as UserDto[];

  console.log({users});
  

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">User List</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table responsive table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Faculty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link
                      to={`/detail-user/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.department?.name}</td>
                  <td>{user.department?.faculty}</td>
                  <td>                    
                    <Link
                      to={`/delete-user/${user.id}`}
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
          <Link to="#" className="btn btn-outline-secondary form-control m-1">
            Add User
          </Link>
        </div>
      </div>
    </div>
  );
}
