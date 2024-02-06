import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SetShoppingCartsModel } from '../../models/set-shopping-cart.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private shoppingCart: ShoppingCartService,
  ){

  }
 signIn(form: NgForm){
  if(form.valid){
    this.http.post("http://localhost:5051/api/Auth/Login",
    {
    usernameOrEmail: form.controls["usernameOrEmail"].value, 
    password: form.controls["password"].value
    })
    .subscribe((res:any) => {
      const request:SetShoppingCartsModel[] = [];

      if(this.shoppingCart.shoppingCarts.length > 0){
        for(let s of this.shoppingCart.shoppingCarts){
          const cart = new SetShoppingCartsModel();
          cart.bookId = s.id;
          cart.userId = this.auth.userId;
          cart.price = s.price;
          cart.quantity = 1;
          
          request.push(cart);
        }

      this.http.post("http://localhost:5051/api/ShoppingCarts/SetShoppingCartsFromLocalStorage", request).subscribe(res => {
      localStorage.removeItem("shoppingCarts");
      this.shoppingCart.getAllShoppingCarts();
      });
    }

    this.router.navigateByUrl("/");
  })
}
 }
}
