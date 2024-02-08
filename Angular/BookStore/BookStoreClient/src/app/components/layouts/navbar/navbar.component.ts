import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [CommonModule,RouterLink, NgIf, FormsModule, NgClass, TranslateModule]
})
export class NavbarComponent { 
  select = "en";
  options = [
    { text: 'English', image: 'assets/united-kingdom.png' },
    { text: 'Türkçe', image: 'assets/turkey.png' }, 
  ]
  selectedOption = 'English';
  showOptions = false;

  constructor(
    private translate: TranslateService,
    public shopping: ShoppingCartService,
    public auth: AuthService,
    private router: Router
    ) {
      if(localStorage.getItem("language")){
        this.select = localStorage.getItem("language") as string;
        if(this.select == "en"){
          this.selectedOption = "English";
        }else{
          this.selectedOption = "Türkçe";
        }
      }

      translate.setDefaultLang(this.select);
      
  }

  toggleSelect() {
    this.showOptions = !this.showOptions;
  }
  
  selectOption(option: any) {
    this.selectedOption = option.text;
    if (option.text == 'English') {
      this.select = 'en';
    } else if (option.text == 'Türkçe') {
      this.select = 'tr';
    } else {
      this.select = 'en';
    }

    localStorage.setItem("language",this.select);
    this.translate.use(this.select);
    location.reload();
  }  

  logout(){
    localStorage.removeItem("response");
    this.shopping.getAllShoppingCarts();
    this.router.navigateByUrl("/login");
    this.auth.isAuthentication();
  }
}