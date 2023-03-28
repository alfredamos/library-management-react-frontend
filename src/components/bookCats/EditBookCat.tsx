import { useParams, useNavigate } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { BookCatDto } from "../../models/bookCats/bookCat.model";
import { bookCatService } from "../../services/bookCat.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { BookCatForm } from "../forms/categories/BookCatForm";
import { useFindResource } from "../../utility/hooks/use-resource.hook";

export const EditBookCat = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookCats = useObservable(bookCatService.bookCats$, [] as BookCatDto[]);

  const { resource: bookCat, isLoading } = useFindResource<BookCatDto>(
    bookCats,
    id!
  );
  
  const handleBookCatSubmit = (bookCatDto: BookCatDto) => {
    bookCatService
      .edit(bookCatDto)
      .pipe(
        map((category) => category as BookCatDto),
        tap((editedBookCat) => {
          const updatedBookCats = bookCats.map((bookCat) =>
            bookCat.id === editedBookCat.id ? editedBookCat : bookCat
          );
        
          bookCatService.updateBookCats$(updatedBookCats);
        }),
        take(1)
      )
      .subscribe((bookCat) => navigate("/categories"));
  };

  const backToList = () => {
    navigate("/categories");
  };

  return (
    <>
      {!isLoading && bookCat && (
        <BookCatForm
          initialValue={bookCat}
          backToList={backToList}
          onBookCat={handleBookCatSubmit}
        />
      )}
    </>
  );
};
