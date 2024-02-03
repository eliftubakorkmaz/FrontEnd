import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { PaymentModel } from '../../models/payment.model';
import { Cities, Countries } from '../../constants/address';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  [key: string]: any;
  shoppingCarts: any[] = [];
  selectedTab: number = 1;
  request: PaymentModel = new PaymentModel();
  countries = Countries; 
  cities = Cities;
  isSameAddress: boolean = false;
  cardNumber1: string = "5890";
  cardNumber2: string = "0400";
  cardNumber3: string = "0000";
  cardNumber4: string = "0016";
  expireMonthAndYear: string = "2026-06"; 
  constructor(
    public shopping: ShoppingCartService,
    private auth: AuthService,
    private error: ErrorService
    ) {

    this.request.books = this.shopping.shoppingCarts;
    this.shopping.calcTotal();
  }

  changeTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  payment(){
    this.request.paymentCard.expireMonth = this.expireMonthAndYear.substring(4);
    this.request.paymentCard.expireYear = this.expireMonthAndYear.substring(0,3);
    this.request.paymentCard.cardNumber = this.cardNumber1 + this.cardNumber2 + this.cardNumber3 + this.cardNumber4;
    this.request.buyer.registrationAddress = this.request.shippingAddress.description;
    this.request.buyer.city = this.request.shippingAddress.city;
    this.request.buyer.country = this.request.shippingAddress.country;
    this.request.userId = this.auth.userId;
    this.shopping.payment(this.request, (res) => {
      const btn = document.getElementById("paymentModalCloseBtn");
      btn?.click();
      localStorage.removeItem("shoppingCarts");
      this.shopping.shoppingCarts = [];
      this.shopping.checkLocalStoreForShoppingCarts();
    })
  }

  changeIsSameAddress(){
    if(this.isSameAddress){
      this.request.billingAddress = {...this.request.shippingAddress};
    }
  }

  gotoNextInputIf4Lenght(inputCount: string = "", value: string = ""){

    this[`cardNumber${inputCount}`] = value.replace(/[^0-9]/g,"");
    value = value.replace(/[^0-9]/g,"");

    if(value.length === 4 ){
      if(inputCount === "4") {
        const el = document.getElementById("expireMonthAndYear");
        el?.focus();
      } else {
        const id: string = `cardNumber${+inputCount + 1}`
        const el: HTMLInputElement = document.getElementById(id) as HTMLInputElement
        el.focus();
      }
    }
  }

  setExpireMonthAndYear(){
    this.expireMonthAndYear = this.expireMonthAndYear.replace(/[^0-9]/g,"");

    if(this.expireMonthAndYear.length > 2){
      this.expireMonthAndYear = this.expireMonthAndYear.substring(0,2) + "/" + this.expireMonthAndYear.substring(2);
    }

    if(this.expireMonthAndYear.length >= 2){
      const month = parseInt(this.expireMonthAndYear.substring(0,2));
      if(month === 0){
        this.expireMonthAndYear = "01" + this.expireMonthAndYear.substring(2);
      } else if (month > 12){
        this.expireMonthAndYear = "12" + this.expireMonthAndYear.substring(2);
      }
    }

    if (this.expireMonthAndYear.length > 4){
      const el = document.getElementById("cvc");
      el?.focus();
    }
  }
}
