import { Category } from "../../enum/category.enum";

export class CreateLibraryDto{
    requesterCategory!: Category;
    bookId!: string;
    userId!: string;
    dateBookOut?: Date;
    dateBookDue?: Date;
    dateBookReturn?: Date;
}