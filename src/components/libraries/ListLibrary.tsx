import { Link } from "react-router-dom";
import { libraryService } from "../../services/library.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { ListLibraryDto } from "../../models/libraries/list-library.model";

export const ListLibrary = (): JSX.Element => {
  const libraries = useObservable(
    libraryService.libraries$,
    [] as ListLibraryDto[]
  ) as ListLibraryDto[];

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Library List</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table responsive table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>                
                <th>User Category</th>
                <th>Book Out Date</th>
                <th>Book Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {libraries.map((library) => (
                <tr key={library.id}>
                  <td>
                    <Link
                      to={`/detail-library/${library.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {library.user?.name}
                    </Link>
                  </td>
                  <td>{library.book?.title}</td>
                  <td>{library.requesterCategory}</td>
                  <td>{library.dateBookOut?.toString()}</td>
                  <td>{library.dateBookDue?.toString()}</td>

                  <td>
                    <Link
                      to={`/edit-library/${library.id}`}
                      className="btn btn-outline-warning m-1"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete-library/${library.id}`}
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
            to="/add-library"
            className="btn btn-outline-secondary form-control m-1"
          >
            Add Library Request
          </Link>
        </div>
      </div>
    </div>
  );
}
