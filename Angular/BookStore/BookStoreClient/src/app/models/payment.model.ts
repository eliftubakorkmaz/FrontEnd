import { BookModel } from "./book.model";

export class PaymentModel {
    userId: number | null = 0;
    books: BookModel[] = []
    buyer: BuyerModel = new BuyerModel();
    shippingAddress: AddressModel = new AddressModel();
    billingAddress: AddressModel = new AddressModel();
    paymentCard: PaymentCardModel = new PaymentCardModel();
}

export class BuyerModel {
 id: string = "" ;

 name: string = "Elif" ;
   
 surname: string = "Korkmaz" ;
   
 identityNumber: string = "111111111111" ;
   
 email: string = "etubasavli@gmail.com" ;
   
 gsmNumber: string = "5545431213" ;
   
 registrationDate: string = "" ;
   
 lastLoginDate: string = "" ;
   
 registrationAddress: string = "" ;
   
 city: string = "" ;
   
 country: string = "" ;
   
 zipCode: string = "" ;
   
 ip: string = "" ;
}

export class AddressModel {
 description: string = "İstanbul";
 zipCode: string = "34760";
 contactName: string = "Elif Korkmaz";
 city: string = "İstanbul";
 country: string = "Türkiye";
}

export class PaymentCardModel {
    cardHolderName: string = "Elif Korkmaz";

    cardNumber: string = "";
   
    expireYear: string = "";
   
    expireMonth: string = "";
   
    cvc: string = "253";
}