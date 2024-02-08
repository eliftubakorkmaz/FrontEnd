import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SwalService } from '../../services/swal.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [FormsModule, RouterLink, TranslateModule]
})
export class RegisterComponent {
constructor(
  private http: HttpClient,
  private swal: SwalService,
  private router: Router
){}

signUp(form: NgForm){
  if(form.valid){
    this.http.post("http://localhost:5051/api/Auth/Register", {
      name: form.controls["name"].value,
      lastname: form.controls["lastname"].value,
      username: form.controls["username"].value,
      email: form.controls["email"].value,
      password: form.controls["password"].value,
    }).subscribe((res:any)=> {
      this.swal.callToast(res.message,"success");
      this.router.navigateByUrl("/login");
    })
  }
}
}