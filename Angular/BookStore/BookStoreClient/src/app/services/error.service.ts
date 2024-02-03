import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  swal: any;
  error: any;

  constructor(
    private translate: TranslateService,
  ) { }

  errorHandler(err: HttpErrorResponse) {

    switch (err.status) {
      case 0:
        this.translate.get("apiNotAvailable").subscribe(res=> {
          this.swal.callToast(res,"error");
          //document.location.href = "/under-maintenance";
         }); 
        break;
      
      case 400:
        this.swal.callToast(err.error.message,"error");
        break;
    
      case 404:
        this.translate.get("apiNotFound").subscribe(res=> {
          this.swal.callToast(res,"error");
         });
        break;
    
      case 500:
          this.swal.callToast(err.error,"error"); 
        break;
  
      default:
        this.translate.get("errorStatusNotFound").subscribe(res=> {
          this.swal.callToast(res,"error");
        })
        break;
    }
  }
}
