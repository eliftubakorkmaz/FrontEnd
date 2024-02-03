import { Component } from '@angular/core';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {
  isPopupShow: boolean = false;
  processBar : number = 0;
  interval: any;

  constructor (){
    setTimeout(() => {
      this.changePopupShow();
      this.interval = setInterval(() => {
        this.processBar += 2; 
      },100)
    }, 2000);

    setTimeout(() => {
      clearInterval(this.interval);
    if(this.isPopupShow) {
      this.changePopupShow();
    }
  }, 8000);
}

  changePopupShow(){
    this.isPopupShow = !this.isPopupShow;
  }

  showDriver(){
    const driverObj = driver({
      popoverClass: "driverjs-theme",
      stagePadding: 4,
      showProgress: true,
      steps: [
        { element: '#language', popover: { title: 'Language', side: "bottom", description: 'Bu kısımdan dil değiştirebilirsiniz.' } },
        { element: '#categories', popover: { title: 'Categories', side: "bottom", description: 'Bu kısımdan kategorileri seçebilirsiniz.' } },
        { element: '#bookSearch', popover: { title: 'Book Search', side: "bottom", description: 'Bu kısımdan kitap arayabilirsiniz.' } },
        { element: '#book0', popover: { title: 'Book', side: "bottom", description: 'Bu kısımdan kitap detaylarını görüntüleyebilirsiniz.' } },
        { element: '#addShoppingCartBtn0', popover: { title: 'Add Shopping Cart', side: "bottom", description: 'Bu kısımdan kitabı sepete ekleyebilirsiniz.' } },
      ]
    });

    driverObj.drive();
  }

  changePopUpShow(){
    this.changePopupShow();
  }
}
