import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
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
export class NavbarComponent implements OnInit {
  showLinks = false;
  currentRoute: string = ""
  isRegstired : boolean = this._SignupService.isRegstired
  token! : any
  constructor(private router: Router, private _SignupService : SignupService){}
  @ViewChild('navbar') navbar: any;
  toggleLinks() {
    this.showLinks = !this.showLinks;
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this._SignupService.isRegisterdChanged.subscribe((value: boolean) => {
      this.isRegstired = value
      console.log(this.isRegstired);
      
    })
  }
  closeNavbar(){
    if(window.innerWidth < 767){
      console.log(this.navbar);
      
      this.navbar.collapse('hide');
    }
  }

  LogOut(){
    // this.isRegstired =  false
    this._SignupService.setIsRegisterd(false)
    localStorage.removeItem('token')
    localStorage.removeItem('code')
    localStorage.removeItem('name')
    this.router.navigate(['signIn'])
  }
}
