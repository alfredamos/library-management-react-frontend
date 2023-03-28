import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BookDto } from "../../../models/books/book.model";
import { AuthorDto } from '../../../models/authors/author.model';
import { BookCatDto } from '../../../models/bookCats/bookCat.model';

interface BookFormProp {
  authors: AuthorDto[];
  categories: BookCatDto[];
  initialValue: BookDto;
  backToList: () => void;
  onBook: (bookDto: BookDto) => void;
}

export const BookForm = ({  
  authors,
  categories,
  initialValue,
  backToList,
  onBook,
}: BookFormProp) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    isbn: yup.string().required(),
    publisher: yup.string().required(),
    volume: yup.string().required(),
    edition: yup.string().required(),
    bookCatId: yup.string().required(),
    authorId: yup.string().required(),
    quantity: yup.string().required(),
    dateOfPublication: yup.string().required()
  });

  const { handleSubmit, register, reset } = useForm<BookDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  });

  return (
    <div className="border" style={{padding: '10px'}}>
      <form onSubmit={handleSubmit((data) => {
        onBook({...data, id: initialValue.id});
        reset();
      })}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Book List</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                {...register("title")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">
                ISBN
              </label>
              <input
                {...register("isbn")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edition" className="form-label">
                Edition
              </label>
              <input
                {...register("edition")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publisher" className="form-label">
                Publisher
              </label>
              <input
                {...register("publisher")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                {...register("quantity")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="volume" className="form-label">
                Volume
              </label>
              <input
                {...register("volume")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfPublication" className="form-label">Publication Date</label>
              <input
                {...register("dateOfPublication")}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="authorId" className="form-label">
                Author
              </label>
              <select               
                {...register("authorId")}
                className="form-select"
              >
                <option>Please Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id} id={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="bookCat" className="form-label">
                Category
              </label>
              <select
                {...register("bookCatId")}
                className="form-select"
              >
                <option>Please Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} id={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-outline-primary form-control m-1">Submit</button>
            <button type="button" className="btn btn-outline-secondary form-control m-1" onClick={backToList}>Back</button>
          </div>
        </div>
      </form>
    </div>
  );
};
