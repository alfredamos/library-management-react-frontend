import { BookCatDto } from "../../models/bookCats/bookCat.model";

interface SingleDisplayProp{
    bookCat: BookCatDto;
    onDelete: () => void;
    onEdit: () => void;
    onBackToList: () => void;
}


export function SingleDisplay({
  bookCat,
  onBackToList,
  onDelete,
  onEdit,
}: SingleDisplayProp): JSX.Element {
  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">BookCat Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Name: {bookCat.name}</li>
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
