import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    // Add the fadeIn animation
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        animate('500ms ease-in')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit  {
  showLinks = false;
  currentRoute: string = ""
  isRegstired : boolean = this._SignupService.isRegistered
  token!: any
  totalName!: any 
  firstName!: string
  code! : any
  width!: any
  @ViewChild('navbar', { static: true })
  navbar!: ElementRef;
  constructor(private router: Router, public _SignupService : SignupService,private cdr: ChangeDetectorRef){

  } 

  toggleLinks() {
    this.showLinks = !this.showLinks;
  }

  closeNavbar() {
    if (window.innerWidth < 992) {
      this.width = true
      const navbarNavAltMarkup = document.getElementById('navbarNavAltMarkup');
      if (navbarNavAltMarkup) {
        navbarNavAltMarkup.classList.remove('show');
      }
    }else{
      this.width =  false
    }
  }
  splitFirstNameOfUser(){
     this.totalName =  localStorage.getItem('name')
      this.totalName = this.totalName.split(' ')
      return {
       firstName: this.totalName[0],
       code: localStorage.getItem('code')
      }
      
  }
  // splitFirstNameOfUser() {
  //   this.totalName = sessionStorage.getItem('name');
  //   this.totalName = this.totalName.split(' ');
  //   return {
  //     firstName: this.totalName[0],
  //     code: sessionStorage.getItem('code')
  //   };
  // }
  LogOut(){
    // this.isRegstired =  false
    // this._SignupService.setIsRegisterd(false)
    this._SignupService.setIsRegistered(false)
    localStorage.removeItem('token')
    localStorage.removeItem('code')
    localStorage.removeItem('name')
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('code');
    this.router.navigate(['signIn'])
  }
  simplefun(){
    const result = this.splitFirstNameOfUser();
    this.firstName = result.firstName;
    this.code = result.code;
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this._SignupService.isRegisteredChanged.subscribe((value: boolean) => {
      this.isRegstired = value
      // console.log(this.isRegstired);
    })


    // console.log(result);  
  }
}
