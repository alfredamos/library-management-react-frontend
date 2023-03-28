import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { LibraryDto } from '../../../models/libraries/library.model';
import { BookDto } from '../../../models/books/book.model';
import { UserDto } from '../../../models/users/user.model';

interface LibraryFormProp{
    books: BookDto[];
    initialValue: LibraryDto;
    users: UserDto[];
    backToList: () => void;
    onLibrary: (libraryDto: LibraryDto) => void;
}

export const LibraryForm = ({books, initialValue, backToList, onLibrary, users}: LibraryFormProp) => {
  const schema = yup.object().shape({
    bookId: yup.string().required(),
    userId: yup.string().required(),
    requesterCategory: yup.string().required()
  });
  
  const {handleSubmit, register, reset} = useForm<LibraryDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  })
  
    return (
      <div className="border" style={{padding: '10px'}}>
        <form onSubmit={handleSubmit((data) => {
          onLibrary({...data, id: initialValue.id});
          reset();
        })}>
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Library List</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="bookId" className="form-label">
                  Book
                </label>
                <select
                  {...register("bookId")}
                  className="form-select"
                >
                  <option>Please Select Book</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id} id={book.id}>{book.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  User
                </label>
                <select
                  {...register("userId")}
                  className="form-select"
                >
                  <option>Please Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id} id={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="requesterCategory" className="form-label">
                  Requester
                </label>
                <input
                  {...register("requesterCategory")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-outline-primary form-control m-1"
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary form-control m-1"
                onClick={backToList}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}
