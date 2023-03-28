import { Link } from "react-router-dom";
import { BookCatDto } from "../../models/bookCats/bookCat.model";
import { bookCatService } from "../../services/bookCat.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";

export const ListBookCat = (): JSX.Element => {
  const bookCats = useObservable(
    bookCatService.bookCats$,
    [] as BookCatDto[]
  );

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">BookCat List</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table responsive table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookCats.map((bookCat) => (
                <tr key={bookCat.id}>
                  <td>
                    <Link
                      to={`/detail-category/${bookCat.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {bookCat.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/edit-category/${bookCat.id}`}
                      className="btn btn-outline-warning m-1"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete-category/${bookCat.id}`}
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
            to="/add-category"
            className="btn btn-outline-secondary form-control m-1"
          >
            Add Book Category
          </Link>
        </div>
      </div>
    </div>
  );
}
