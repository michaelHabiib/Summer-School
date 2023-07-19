import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservtionService } from 'src/app/services/reservtion.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private _ReservtionService : ReservtionService){}

  ContactForm = new FormGroup({
    gender: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',Validators.required),
    topic: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required)
  });
  GetErrorEmailMsg(){
    if (this.ContactForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }else{
      return this.ContactForm.controls.email.hasError('email') ? 'Not a valid email' : '';
    }
  }
  GetErrorGenderMessage(){
    if (this.ContactForm.controls.gender.hasError('required')) {
      return 'You must Select a value';
    }else{
      return 
    }
  }
  GetFirstNameMsg(){
    if (this.ContactForm.controls.firstName.hasError('required')) {
      return 'You must enter a value';
    }else{
      return ''
    }
  }
  GetLastNameMsg(){
    if (this.ContactForm.controls.lastName.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetPhoneMsg(){
    if (this.ContactForm.controls.phone.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetTopicMsg(){
    if (this.ContactForm.controls.topic.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  GetMessageMsg(){
    if (this.ContactForm.controls.message.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  onSubmit(){
    if(this.ContactForm.status){
      console.log(this.ContactForm);
      let modal = {
        gender : this.ContactForm.value.gender,
        firstName : this.ContactForm.value.firstName,
        lastName : this.ContactForm.value.lastName,
        email: this.ContactForm.value.email,
        phone : this.ContactForm.value.phone,
        topic : this.ContactForm.value.topic,
        message : this.ContactForm.value.message
      }
      this._ReservtionService.SendEmailToUser(modal).subscribe({
        next : (result)=>{
          console.log(result);
        },
        error : (err)=>{
          console.log(err);
        }
      })
      this.ContactForm.reset()
    }
  }
}
