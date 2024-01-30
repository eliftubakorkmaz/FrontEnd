import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCarts: any[] = [];
  prices: {value: number, currency: string}[] = [];
  count: number = 0;
  total: number = 0;
  constructor(
    public shopping: ShoppingCartService,
    private http: HttpClient,
  ) {
    if(localStorage.getItem("shoppingCarts")){
      const carts: string | null = localStorage.getItem("shoppingCarts")
      if(carts !== null){
        this.shoppingCarts = JSON.parse(carts);
        this.count = this.shoppingCarts.length;
      }
    }
   }
   calcTotal(){
    this.total = 0;
    for(let s of this.shoppingCarts){
      this.total += s.price.value;
    }
   }

   removeByIndex(index: number){
    this.shoppingCarts.splice(index, 1);
    localStorage.setItem("shopppingCarts", JSON.stringify(this.shoppingCarts));
    this.count = this.shoppingCarts.length;
    this.calcTotal();
   }

   payment(currency: string){
    const newList = this.shoppingCarts.filter(p => p.price.currency === currency);
    this.http.post("http://localhost:5051/api/ShoppingCarts/Payment", {book: this.shoppingCarts})
    .subscribe(res =>{

    })
   }
}
