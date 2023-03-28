import { useObservable } from "../../utility/hooks/use-observable.hook";
import { authorService } from "../../services/author.service";
import { AuthorDto } from "../../models/authors/author.model";
import { useNavigate, useParams } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { AuthorForm } from "../forms/authors/AuthorForm";
import { useFindResource } from "../../utility/hooks/use-resource.hook";

export const EditAuthor = (): JSX.Element => {
  const { id } = useParams();

  console.log({ id });

  const navigate = useNavigate();

  const authors = useObservable(authorService.authors$, [] as AuthorDto[]);

  console.log({ authors });

  console.log({ id });

  const { resource: author, isLoading } = useFindResource<AuthorDto>(
    authors,
    id!
  );

  const handleAuthorSubmit = (authorDto: AuthorDto) => {
    authorService
      .edit(authorDto)
      .pipe(
        map((authorL) => authorL as AuthorDto),
        tap((editedAuthor) => {
          const updatedAuthors = authors.map((author) =>
            author.id === editedAuthor.id ? editedAuthor : author
          );

          authorService.updateAuthors$(updatedAuthors);
        }),
        take(1)
      )
      .subscribe((author) => navigate("/authors"));
  };

  const backToList = () => {
    navigate("/authors");
  };

  return (
    <>
      {!isLoading && author && (
        <AuthorForm
          initialValue={author}
          backToList={backToList}
          onAuthor={handleAuthorSubmit}
        />
      )}
    </>
  );
};
