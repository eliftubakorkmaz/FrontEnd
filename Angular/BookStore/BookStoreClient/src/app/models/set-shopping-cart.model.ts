import { Money } from "./book.model";

export class SetShoppingCartsModel{
    bookId: number = 0;
    userId: number | null= 0;
    price: Money = new Money();
    currency: string = "";
    quantity: number = 0;
}