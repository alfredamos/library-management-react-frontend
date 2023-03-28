import { UserDto } from '../../models/users/user.model';

interface SingleDisplayProp{
    user: UserDto;
    onDelete: () => void;
    onEdit: () => void;
    onBackToList: () => void;
}


export function SingleDisplay({
  user,
  onBackToList,
  onDelete,
  onEdit,
}: SingleDisplayProp): JSX.Element {
  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">User Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Name: {user.name}</li>
            <li className="list-group-item">Email: {user.email}</li>
            <li className="list-group-item">Phone: {user.phone}</li>
            <li className="list-group-item">Department: {user.department?.name}</li>
            <li className="list-group-item">Gender: {user.gender}</li>
            <li className="list-group-item">User Type: {user.userType}</li>
            
          </ul>
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-outline-warning form-control m-1"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger form-control m-1"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary form-control m-1"
            onClick={onBackToList}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
