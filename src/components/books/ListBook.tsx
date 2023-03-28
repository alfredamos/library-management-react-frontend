import { Link } from "react-router-dom";
import { BookDto } from "../../models/books/book.model";
import { bookService } from "../../services/book.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { ListBookDto } from "../../models/books/list-book.model";

export const ListBook = (): JSX.Element => {
  const books = useObservable(
    bookService.books$,
    [] as ListBookDto[]
  ) as ListBookDto[];

  console.log("books : ", books);

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Book List</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table responsive table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Author</th>
                <th>Category</th>
                <th>Edition</th>
                <th>Volume</th>
                <th>Publication Date</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <Link
                      to={`/detail-book/${book.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td>{book.isbn}</td>
                  <td>{book.author?.name}</td>
                  <td>{book.category?.name}</td>
                  <td>{book.edition}</td>
                  <td>{book.volume}</td>
                  <td>{book.dateOfPublication?.toString()}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <Link
                      to={`/edit-book/${book.id}`}
                      className="btn btn-outline-warning m-1"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete-book/${book.id}`}
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
            to="/add-book"
            className="btn btn-outline-secondary form-control m-1"
          >
            Add Book
          </Link>
        </div>
      </div>
    </div>
  );
};
