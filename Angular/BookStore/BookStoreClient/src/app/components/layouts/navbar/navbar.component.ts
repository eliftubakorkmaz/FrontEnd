import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(
    private translate: TranslateService,
    public shopping: ShoppingCartService,
    public auth: AuthService,
    private router: Router
    ) {
    translate.setDefaultLang('en');
  }

  switchLanguage(event: any) {
    this.translate.use(event.target.value);
  }

  logout(){
    localStorage.removeItem("response");
    this.shopping.getAllShoppingCarts();
    this.router.navigateByUrl("/login");
  }
}
