import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BookCatDto } from "../../../models/bookCats/bookCat.model";

interface BookCatFormProp {
  initialValue: BookCatDto;
  onBookCat: (bookCatDto: BookCatDto) => void;
  backToList: () => void;
}

export const BookCatForm = ({
  backToList,
  initialValue,
  onBookCat,
}: BookCatFormProp) => {
  const schema = yup.object().shape({
    name: yup.string().required()
  });

  const { handleSubmit, register, reset } = useForm<BookCatDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  });

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit((data) => {
          onBookCat({ ...data, id: initialValue.id });
          reset();
        })}
      >
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Book Category Form</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="" className="from-label">
                Name
              </label>
              <input
                {...register("name")}
                defaultValue={initialValue.name}
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
              className="btn btn-outline-primary form-control m-1"
              onClick={backToList}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
