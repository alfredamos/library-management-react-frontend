import { ListBookDto } from "../../models/books/list-book.model";

interface SingleDisplayProp{
    book: ListBookDto;
    onDelete: () => void;
    onEdit: () => void;
    onBackToList: () => void;
}


export function SingleDisplay({
  book,
  onBackToList,
  onDelete,
  onEdit,
}: SingleDisplayProp): JSX.Element {
  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Book Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Title: {book.title}</li>
            <li className="list-group-item">ISBN: {book.isbn}</li>
            <li className="list-group-item">Category: {book.category?.name}</li>
            <li className="list-group-item">Author: {book.author?.name}</li>
            <li className="list-group-item">Publisher: {book.publisher}</li>
            <li className="list-group-item">Volume: {book.volume}</li>
            <li className="list-group-item">Edition: {book.edition}</li>
            <li className="list-group-item">Quantity: {book.quantity}</li>
            <li className="list-group-item">Publication Date: {book.dateOfPublication.toString()}</li>
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
