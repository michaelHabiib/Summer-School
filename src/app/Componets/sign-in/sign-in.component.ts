import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loading = false
  screenWidth :number = window.innerWidth
  isLinear = false
  hide = true
  message : String | undefined 
  token : string = ''
  name : string = ''
  code: string = '';
  id : string = ''


  constructor(public _SignupService : SignupService, private router: Router){}
  SignInForm = new FormGroup({
    EmailForm: new FormControl('', [Validators.required, Validators.email]),
    passwordForm: new FormControl('', [Validators.required]),
  });
  GetErrorEmailMsg(){
    if (this.SignInForm.controls.EmailForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return this.SignInForm.controls.EmailForm.hasError('email') ? 'Not a valid email' : '';
    }
  }
  GetErrorPasswordMsg(){
    if (this.SignInForm.controls.passwordForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  submitSignIN(){
    this.loading = true 
    let modal = {
      email : this.SignInForm.controls.EmailForm.value,
      password : this.SignInForm.controls.passwordForm.value
    }
    this._SignupService.SignIn(modal).subscribe({
      next : (result) => {
        this.loading = false
        this.router.navigate(['/services'])
        this.token = result.token
        localStorage.setItem('token',this.token)
        // console.log(localStorage.getItem('token'));
        const decodedToken = jwt_decode(this.token) as {id: string, code: string, name: string};
        console.log(decodedToken);
        this.name = decodedToken.name
        this.code = decodedToken.code
        this.id =  decodedToken.id
        localStorage.setItem('name',this.name)
        localStorage.setItem('code',this.code)
        localStorage.setItem('userID',this.id)
        this._SignupService.setIsRegisterd(true)
      },
      error : (err) => {
        console.log(err);
        this.message = err.error.message
        console.log(this.message);
        this.loading = false
      }
    })
  }
}
