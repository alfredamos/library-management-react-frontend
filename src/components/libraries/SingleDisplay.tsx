import { ListLibraryDto } from '../../models/libraries/list-library.model';

interface SingleDisplayProp{
    library: ListLibraryDto;
    onDelete: () => void;
    onEdit: () => void;
    onBackToList: () => void;
}


export function SingleDisplay({
  library,
  onBackToList,
  onDelete,
  onEdit,
}: SingleDisplayProp): JSX.Element {
  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Library Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">User: {library.user?.name}</li>
            <li className="list-group-item">Book: {library.book?.title}</li>
            <li className="list-group-item">Requester Category: {library.requesterCategory}</li>
            <li className="list-group-item">Date Out: {library.dateBookOut?.toString()}</li>
            <li className="list-group-item">Due Date: {library.dateBookDue?.toString()}</li>
            
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
