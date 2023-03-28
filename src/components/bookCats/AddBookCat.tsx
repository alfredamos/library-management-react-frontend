import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { BookCatDto } from "../../models/bookCats/bookCat.model";
import { bookCatService } from "../../services/bookCat.service";
import { BookCatForm } from "../forms/categories/BookCatForm";
import { useObservable } from '../../utility/hooks/use-observable.hook';

export const AddBookCat = (): JSX.Element => {
  const categories = useObservable(bookCatService.bookCats$, [] as BookCatDto[])
  const [initialValue, setInitialValue] = useState({
    id: "",
    name: "",
  } as BookCatDto);

  const navigate = useNavigate();

  const handleBookCatSubmit = (bookCatDto: BookCatDto) => {
    bookCatService
      .create(bookCatDto)
      .pipe(
        map((category) => category as BookCatDto),
        tap((newCategory) => {
          const categoryList = [...categories, newCategory];
          bookCatService.updateBookCats$(categoryList);
        }),
        take(1)
      )
      .subscribe((cat) => navigate("/categories"));
  };

  const backToList = () => {
    navigate("/categories");
  };

  return (
    <BookCatForm
      initialValue={initialValue}
      backToList={backToList}
      onBookCat={handleBookCatSubmit}
    />
  );
}
