import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BookModel } from '../../models/book.model';
import { ErrorService } from '../../services/error.service';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SwalService } from '../../services/swal.service';
import { AddShoppingCartModel } from '../../models/add-shopping-cart.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export default class BookDetailComponent {
book: BookModel = new BookModel();

constructor(
  private http: HttpClient,
  private activated: ActivatedRoute,
  private error:ErrorService,
  private translate: TranslateService,
  private auth: AuthService,
  private shopping: ShoppingCartService,
  private swal: SwalService
){
  this.activated.params.subscribe(res=> {
    this.http.get<BookModel[]>('http://localhost:5051/api/Books/GetById/' + res["value"]).subscribe({
      next: (res: any) => {
        this.book = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  })  
}

addShoppingCart(){   
  if(localStorage.getItem("response")){
    const data : AddShoppingCartModel = new AddShoppingCartModel();
    data.bookId = this.book.id;
    data.price = this.book.price;
    data.quantity = 1;
    this.auth.isAuthentication();
    data.userId = this.auth.userId;

    this.http.post("http://localhost:5051/api/ShoppingCarts/Add", data).subscribe({
      next: (res: any)=> {
        this.shopping.getAllShoppingCarts();
          this.translate.get("addBookInShoppingCartIsSuccessful").subscribe((res:any)=> {
            this.swal.callToast(res);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }else{
    if(this.book.quantity < 1){
      this.translate.get("bookQuantityIsNotEnough").subscribe((res:any)=> {
        this.swal.callToast(res,"error");
      });        
    }else{
      const checkBookIsAlreadyExists = this.shopping.shoppingCarts.filter(p=> p.id == this.book.id)[0];

      if(checkBookIsAlreadyExists !== undefined){
        this.shopping.shoppingCarts.filter(p=> p.id == this.book.id)[0].quantity += 1;
      }else{
        const newBook = {...this.book};
        newBook.quantity = 1;
        this.shopping.shoppingCarts.push(newBook);
      }
      
      this.shopping.calcTotal();
      localStorage.setItem("shoppingCarts", JSON.stringify(this.shopping.shoppingCarts));
      this.translate.get("addBookInShoppingCartIsSuccessful").subscribe((res:any)=> {
        this.swal.callToast(res);
      });
    }      
  }
}


}