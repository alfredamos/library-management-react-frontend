import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthorDto } from "../../../models/authors/author.model";

interface AuthorFormProp {
  initialValue: AuthorDto;
  onAuthor: (authorDto: AuthorDto) => void;
  backToList: () => void;
}

export const AuthorForm = ({
  backToList,
  initialValue,
  onAuthor,
}: AuthorFormProp) => {
  const schema = yup.object().shape({
    name: yup.string().required()
  });

  const { handleSubmit, register, reset } = useForm<AuthorDto>({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  });

  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit                                                                            ((data) => {
        onAuthor({...data, id: initialValue.id});
        reset();
      })}>
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Author List</h4>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
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
};
