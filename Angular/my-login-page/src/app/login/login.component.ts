import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPasswordFocus: boolean = false;

  constructor(private toastr: ToastrService) {

  }

  signIn(form:NgForm){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])?=.*[!@#$#%^&*()_+\-\[\]{};:'\\],.>\/?](?=.[0-9]).+$/;
    const str = form.controls["password"].value;
    const isValid = regex.test(str);

    if (form.valid && isValid){
      
    } else {
      this.toastr.error("Lütfen zorunlu alanları doldurunuz.")

      const userNameOrEmailEl:any = document.getElementById("userNameOrEmail");
      if (!userNameOrEmailEl.validity.valid){
        userNameOrEmailEl.classList.add("is-invalid");
        userNameOrEmailEl.classList.remove("is-valid");

        const errorMessage = userNameOrEmailEl.validationMessage;
        const divEl:any = document.querySelector(`#${userNameOrEmailEl.id} + .invalid-feedback`);
        divEl.innerHTML = errorMessage;
      }

      this.isPasswordFocus = true;
    }
  }

  checkRegexPatternOrPassword(el: HTMLInputElement){
    const text = el.value;

    const upperCaseRegex = /[A-Z]/;
    const upperCaseResult = upperCaseRegex.test(text);
    const upperLetterEl = document.getElementById("upperLetter");
    upperLetterEl?.classList.add(upperCaseResult ? 'pw-success' : 'pw-error');
    upperLetterEl?.classList.remove(!upperCaseResult ? 'pw-success' : 'pw-error');

    const lowerCaseRegex = /[a-z]/;
    const lowerCaseResult = lowerCaseRegex.test(text);
    const lowerLetterEl = document.getElementById("lowerLetter");
    lowerLetterEl?.classList.add(lowerCaseResult ? 'pw-success' : 'pw-error');
    lowerLetterEl?.classList.remove(!lowerCaseResult ? 'pw-success' : 'pw-error');

    const specialCaseRegex = /[!@#$#%^&*()_+\-=\[\]{};:'\\|,.<>\/?]+/;
    const specialCaseResult = specialCaseRegex.test(text);
    const specialLetterEl = document.getElementById("specialLetter");
    specialLetterEl?.classList.add(specialCaseResult ? 'pw-success' : 'pw-error');
    specialLetterEl?.classList.remove(!specialCaseResult ? 'pw-success' : 'pw-error');

    
    const numeraticCaseRegex = /[0-9]/;
    const numeraticCaseResult = numeraticCaseRegex.test(text);
    const numeraticLetterEl = document.getElementById("numeraticLetter");
    numeraticLetterEl?.classList.add(numeraticCaseResult ? 'pw-success' : 'pw-error');
    numeraticLetterEl?.classList.remove(!numeraticCaseResult ? 'pw-success' : 'pw-error');

    const minSixCharacterEl = document.getElementById("minSixCharacter");
    minSixCharacterEl?.classList.add(text.length < 6 ? "pw-error" : "pw-success");
    minSixCharacterEl?.classList.remove(text.length >= 6 ? "pw-error" : "pw-success");

    const regex = /^(?=.*[a-z])(?=.*[A-Z])?=.*[!@#$#%^&*()_+\-\[\]{};:'\\],.>\/?](?=.[0-9]).+$/;
    const isValid = regex.test(text);

    if (isValid){
      this.isPasswordFocus = false;
      el.classList.add("is-valid");
      el.classList.remove("is-invalid");
    } else {
      this.isPasswordFocus = true;
      el.classList.remove("is-valid");
      el.classList.add("is-invalid");
    }
  }

}
