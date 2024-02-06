import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestModel } from '../../models/request.model';
import { BookModel } from '../../models/book.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AddShoppingCartModel } from '../../models/add-shopping-cart.model';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  [x: string]: any;
  books: BookModel[] = [];
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategories: string = "";
  newData: any[] = [];
  loaderDatas = [1,2,3,4,5,6];
  isLoading: boolean = true;
  swal: any;

  constructor(
    private http: HttpClient,
    private shopping: ShoppingCartService,
    private auth: AuthService,
    private translate: TranslateService,
    private error: ErrorService
    ){
    //this.getAll();
    if(localStorage.getItem("request")){
      const requestString:any = localStorage.getItem("request");
      const requestObj = JSON.parse(requestString);
      this.request = requestObj;
    }
    this.getCategories();
  }

  addShoppingCart(book: BookModel){
    if (localStorage.getItem("response")){
      const data: AddShoppingCartModel = new AddShoppingCartModel();
      data.bookId = book.id;
      data.price = book.price;
      data.quantity = 1;
      data.userId = this.auth.userId;
      this.http.post("http://localhost:5051/api/ShoppingCarts/Add", book).subscribe({
       next: (res:any) => {
        this.shopping.getAllShoppingCarts();
        this.translate.get("addBookInShoppingCartIsSuccessful").subscribe(res => {
        this.swal.callToast(res);
        })
       }, 
       error: (err:HttpErrorResponse) => {
        this.error.errorHandler(err);
       }
      });
    }else {
      if(book?.quantity < 1){
        this.translate.get("bookQuantityIsNotEnough").subscribe(res=> {
        this.swal.callToast(res, "error");
        });
      } else {
        const checkBookIsAlreadyExists = this.shopping.shoppingCarts.filter(p => p.id == book.id)[0];

        if(checkBookIsAlreadyExists !== null){
          this.shopping.shoppingCarts.filter(p => p.id == book.id)[0].quantity +=1;
        }else {
          const newBook ={...book};
          newBook.quantity = 1;
          this.shopping.shoppingCarts.push(newBook);
        }
        this.shopping.calcTotal();
        localStorage.setItem("shoppingCarts",JSON.stringify(this.shopping.shoppingCarts));
        this.translate.get("addBookInShoppingCartIsSuccessful").subscribe(res => {
        this.swal.callToast(res);
        });
      }
    }
  }

  feedData(){
    this.request.pageSize += 10;
    this.newData = [];
    this.getAll();
  }

  changeCategory(categoryId: number | null = null){
    this.request.categoryId = categoryId;
    this.request.pageSize = 0;
    this.feedData();
  }

  getAll(){
    this.isLoading = true;
    this.http
    .post<BookModel[]>(`http://localhost:5051/api/Books/GetAll`, this.request)
    .subscribe({
     next: (res:any) => {
      this.books = res;
      this.isLoading = false;
      localStorage.setItem("request", JSON.stringify(this.request));
     },
     error: (err:HttpErrorResponse) => {
      this.error.errorHandler(err);
     }
    });
  }

  getCategories(){
    this.isLoading = true;
    this.http.get("http://localhost:5051/api/Categories/GetAll")
    .subscribe({
      next: (res:any) => {
        this.categories = res;
        this.getAll();
        this.isLoading = false;
      },
      error: (err:HttpErrorResponse) => {
        this.error.errorHandler(err);
       }
    });
  }
}
