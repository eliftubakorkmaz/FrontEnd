import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel } from '../models/payment.model';
import { AuthService } from './auth.service';
import { SetShoppingCartsModel } from '../models/set-shopping-cart.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCarts: any[] = [];
  prices: { value: number, currency: string }[] = [];
  count: number = 0;
  total: number = 0;
  isLoading: boolean = false;
  error: any;

  constructor(
     private http: HttpClient,
     private auth: AuthService,
     private err: ErrorService
  ) {
   }
   
   checkLocalStoreForShoppingCarts(){
    const shoppingCartString = localStorage.getItem("shoppingCarts");
    if(shoppingCartString){
      const carts: string | null = localStorage.getItem("shoppingCarts")
      if(carts !== null){
        this.shoppingCarts = JSON.parse(carts);    
      }
    } else {
      this.shoppingCarts = [];
    }

    if(localStorage.getItem("response")){
      this.http.get<SetShoppingCartsModel[]>("http://localhost:5051/api/ShoppingCarts/GetAll" + this.auth.userId).subscribe({
        next: (res:any) => {
        this.shoppingCarts = res
        this.calcTotal();
        },
        error: (err:HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
    }

    this.calcTotal();
   }

   calcTotal(){
    this.count = this.shoppingCarts.length;
    this.total = 0;
    for(let s of this.shoppingCarts){
      this.total += s.price.value;
    }
   }

   removeByIndex(index: number){
    if(localStorage.getItem("response")){
        this.http.get("http://localhost:5051/api/ShoppingCarts/RemoveById" + this.shoppingCarts[index]?.shoppingCartId).subscribe(res => {
          this.checkLocalStoreForShoppingCarts();
        });
    } else {
      this.shoppingCarts.splice(index, 1);
      localStorage.setItem("shopppingCarts", JSON.stringify(this.shoppingCarts));
      this.count = this.shoppingCarts.length;
      this.calcTotal();
    }
   }

   payment(data: PaymentModel, callBack: (res:any)=> void){
    this.http.post("http://localhost:5051/api/ShoppingCarts/Payment", data)
    .subscribe({
      next: (res:any) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
   }
}
