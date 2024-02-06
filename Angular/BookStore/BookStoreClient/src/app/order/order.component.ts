import { Component } from '@angular/core';
import { BookModel, Money } from '../models/book.model';
import { OrderStatusEnum } from '../models/order-status-enum';
import { OrderModel } from '../models/order-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: OrderModel[] = [];
  orderStatusEnum= OrderStatusEnum;
  selectedOrder: OrderModel = new OrderModel();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private err: ErrorService,
    private translate: TranslateService
  ){
    this.getAll();
  }

  getAll(){
    this.http.get("http://localhost:5051/api/GetAllByUserId/" + this.auth.userId).subscribe({
      next: (res:any)=> {
        this.orders = res;
      },
      error: (err:HttpErrorResponse)=> {
        this.err.errorHandler(err);
      }
    })
  }

  checkOrderIsRejected(order: OrderModel){
    for(let o of order.orderStatuses){
      if(o.status == OrderStatusEnum.Rejected){
        return true;
      }
    }

    return false;
  }

  checkOrderIsReturn(order: OrderModel){
    for(let o of order.orderStatuses){
      if(o.status == OrderStatusEnum.Returned){
        return true;
      }
    }

    return false;
  }

  translateOrderStatus(status: string){
   return this.translate.get(status);
  }

  hasTheReturnPeriodPassed(statusDate: string){
    const returnPeriod = 14; // 14 gün
    const statusDateObj = new Date(statusDate);
    const currentDate = new Date();

    // statusDate'den itibaren geçen zamanın milisaniye cinsinden hesaplanması
    const timeDiff = currentDate.getTime() - statusDateObj.getTime();

    // Zaman farkının gün cinsinden hesaplanması
    const diffDays = timeDiff / (1000 * 3600 * 24);

    // 14 günden az ise true, değilse false dön
    return diffDays < returnPeriod;
  }

  selectedOrderForComment(order: OrderModel){
    this.selectedOrder = {...order};
  }

  saveComment(){
    this.http.post("http://localhost:5051/api/Orders/SaveComment", {orderId: this.selectedOrder.id, comment: this.selectedOrder.comment, raiting: this.selectedOrder.raiting}).subscribe({
      next: (res:any)=> {
        const el = document.getElementById("commentModalCloseBtn")
        el?.click();
        this.getAll();
      },
      error: (err: HttpErrorResponse)=> {
        this.err.errorHandler(err);
      }
    })
  }
}

