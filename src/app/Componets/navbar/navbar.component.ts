import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  username! : any
  width!: any
  kind : string = 'user'
  @ViewChild('navbar', { static: true })
  navbar!: ElementRef;
  constructor(private router: Router,
     public _SignupService : SignupService,
     private cdr: ChangeDetectorRef){
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
  splitFirstNameOfUser(totalName : any){
     totalName = localStorage.getItem('name')
      totalName = totalName.split(' ')
      return {
        totalName : totalName[0],
        code : localStorage.getItem('code')
      }
  }

  LogOut(){
    this._SignupService.setIsRegistered(false)
    localStorage.removeItem('token')
    localStorage.removeItem('code')
    localStorage.removeItem('name')
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('code');
    this.router.navigate(['signIn'])
  }
  valueChanged(kind : string){
    this.kind =  kind
    // this.kind = this._SignupService.kind
    this._SignupService.changeAdmin(this.kind);
    localStorage.setItem('admin', this.kind);
    this._SignupService.kind = this.kind
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this._SignupService.isRegisteredChanged.subscribe((value: boolean) => {
      this.isRegstired = value
    })
    this.kind = this._SignupService.kind;
        if (!localStorage.getItem('admin')) {
      localStorage.setItem('admin', 'user');
    }
    this.kind = localStorage.getItem('admin')!;

    this.username = localStorage.getItem('name')
    this.code = localStorage.getItem('code')
  }
}
