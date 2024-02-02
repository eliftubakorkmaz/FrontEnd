import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestModel } from '../../models/request.model';
import { BookModel } from '../../models/book.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AddShoppingCartModel } from '../../models/add-shopping-cart.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: BookModel[] = [];
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategories: string = "";
  newData: any[] = [];
  loaderDatas = [1,2,3,4,5,6];
  isLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private shopping: ShoppingCartService,
    private auth: AuthService
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
      this.http.post("http://localhost:5051/api/ShoppingCarts/Add", book).subscribe(res => {
        this.shopping.checkLocalStoreForShoppingCarts();
      })
    }else {
      this.shopping.shoppingCarts.push(book);
      localStorage.setItem("shoppingCarts",JSON.stringify(this.shopping.shoppingCarts));
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
    .subscribe(res => {
      this.books = res;
      this.isLoading = false;
      localStorage.setItem("request", JSON.stringify(this.request));
    })
  }

  getCategories(){
    this.isLoading = true;
    this.http.get("http://localhost:5051/api/Categories/GetAll")
    .subscribe(res => this.categories = res);
    this.getAll();
    this.isLoading = false;
  }
}
