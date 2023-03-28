import { authorService } from "../../services/author.service"
import { useObservable } from '../../utility/hooks/use-observable.hook';
import { AuthorDto } from '../../models/authors/author.model';
import { Link } from "react-router-dom";

export const ListAuthor = (): JSX.Element => {
  const authors = useObservable(authorService.authors$, [] as AuthorDto[]);
 
  
  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Author List</h4>
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
              {authors.map((author) => (
                <tr key={author.id}>
                  <td>
                    <Link
                      to={`/detail-author/${author.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {author.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/edit-author/${author.id}`}
                      className="btn btn-outline-warning m-1"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete-author/${author.id}`}
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
            to="/add-author"
            className="btn btn-outline-secondary form-control m-1"
          >
            Add Author
          </Link>
        </div>
      </div>
    </div>
  );
}
