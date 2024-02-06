import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(
  private http: HttpClient,
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
      this.router.navigateByUrl("/login");
    })
  }
}
}
