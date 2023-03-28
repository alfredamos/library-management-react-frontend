import { AuthorForm } from "../forms/authors/AuthorForm";
import { useState} from "react";
import { AuthorDto } from "../../models/authors/author.model";
import { useNavigate } from "react-router-dom";
import { authorService } from "../../services/author.service";
import { map, take, tap } from "rxjs";
import { useObservable } from "../../utility/hooks/use-observable.hook";

export const AddAuthor = (): JSX.Element => {
  const authors = useObservable(authorService.authors$, [] as AuthorDto[]);
  const [initialValue, setInitialValue] = useState<AuthorDto>({
    id: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleAuthorSubmit = (authorDto: AuthorDto) => {
    authorService
      .create(authorDto)
      .pipe(
        map(author => author as AuthorDto),
        tap((newAuthor) => {
          const authorList = [...authors, newAuthor];
          authorService.updateAuthors$(authorList);
        }),
        take(1)
      )
      .subscribe((author) => navigate("/authors"));
  };

  const backToList = () => {
    navigate("/authors");
  };

  /* useEffect(() => {
    return () => authorSubscription?.unsubscribe();
  },[authorSubscription]); */

  return (
    <AuthorForm
      initialValue={initialValue}
      backToList={backToList}
      onAuthor={handleAuthorSubmit}
    />
  );
};
