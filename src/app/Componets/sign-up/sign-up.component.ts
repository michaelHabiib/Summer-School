import { Component,HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isLinear = true;
  hide = true
  loading = false
  screenWidth: number = window.innerWidth
  message : String | undefined 

  constructor(public _SignupService : SignupService, private router: Router){}
  SignUpForm1 = new FormGroup({
    NameForm: new FormControl('', [Validators.required, this.nameValidator]),
    EmailForm: new FormControl('', [Validators.required, Validators.email]),
    passwordForm: new FormControl('', [Validators.required]),
    phoneForm: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
  });
  SignUpForm2 = new FormGroup({
    bulidingNumber : new FormControl('',[Validators.required]),
    street : new FormControl('',[Validators.required]),
    Area : new FormControl('', [Validators.required]),
  })
  SignUpForm3 = new FormGroup({
    BirthdayDate : new FormControl('',[Validators.required]),
    yearForm : new FormControl('',[Validators.required]),
  })
  nameValidator(control: any) {
    if (!control || !control.value) {
      return null; // Return null if the control is empty or null
    }
  
    const names = control.value.split(' ');
    if (names.length < 4) {
      return { 'name': 'Please enter at least 3 names' }; // Return an error object if the number of names is less than 4
    }
  
    return null; // Return null if the validation succeeds
  }
  submitSignUp1(){
    if(this.SignUpForm1.status){
      // console.log(this.SignUpForm1);
    }
  }
  submitSignUp2(){
    if(this.SignUpForm2.status){
      // console.log(this.SignUpForm2);
    }
  }
  submitSignUp3(){
    if(this.SignUpForm3.status){
      // console.log(this.SignUpForm3);
    }
  }
  GetErrorNameMsg(){
    if (this.SignUpForm1.controls.NameForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetErrorEmailMsg(){
    if (this.SignUpForm1.controls.EmailForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return this.SignUpForm1.controls.EmailForm.hasError('email') ? 'Not a valid email' : '';
    }
  }
  GetErrorPasswordMsg(){
    if (this.SignUpForm1.controls.passwordForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    } 
  }
  GetErrorPhoneMsg(){
    if (this.SignUpForm1.controls.phoneForm.hasError('required')) {
      return 'You must enter a value';
    }else if (this.SignUpForm1.controls.phoneForm.hasError('maxLength')){
      return 'please Enter 11 NUmber'
      // this.SignUpForm1.controls.phoneForm.hasError('max-length','min-length') ? 'please Enter 11 NUmber' : '';
    }else {
      return ''
    }
  }
  GetErrorBulidingNumberMsg(){
    if (this.SignUpForm2.controls.bulidingNumber.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetErrorStreetMsg(){
    if (this.SignUpForm2.controls.street.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetErrorAreaMsg(){
    if (this.SignUpForm2.controls.Area.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetErrorBirthdayMsg(){
    if (this.SignUpForm3.controls.BirthdayDate.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetErrorYearMsg(){
    if (this.SignUpForm3.controls.yearForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  SignUp(){
    this.loading = true
    const birthdayDateString: any = this.SignUpForm3.controls.BirthdayDate.value;
    const birthdayDate: Date = new Date(birthdayDateString);
    const formattedBirthdayDate: string = birthdayDate.toISOString().substring(0, 10);
    let modal = {
      name : this.SignUpForm1.controls.NameForm.value,
      email : this.SignUpForm1.controls.EmailForm.value,
      password : this.SignUpForm1.controls.passwordForm.value,
      phone: this.SignUpForm1.controls.phoneForm.value,
      year : this.SignUpForm3.controls.yearForm.value,
      bulidingNumber : this.SignUpForm2.controls.bulidingNumber.value,
      street : this.SignUpForm2.controls.street.value,
      Area : this.SignUpForm2.controls.Area.value,
      BirthdayDate : formattedBirthdayDate
    }
    console.log(modal);
    
    this._SignupService.SignUp(modal).subscribe({
      next : (result) =>{
        this.loading = false
        this.router.navigate(['/signIn'])
      },
      error : (err) => {
        console.log(err.error);
        this.message = err.error.messgae
        this.loading = false
        
      }
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }
}
