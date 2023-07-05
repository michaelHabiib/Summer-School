import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ReservtionService } from './services/reservtion.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'SundaySchool';
  isDrawerOpen: boolean = false;
  activeClass: string = '';
  // value :  any 
  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private _ReservtionService : ReservtionService){}

  @ViewChild('drawer')
  drawer!: MatDrawer;

  passValue(value : string) {
    this.drawer.close();
    this._ReservtionService.setSelectedValue(value)
    console.log(value);
    this.activeClass = 'active';
  }


  
  ngAfterViewInit() {

    const isDrawerOpen = localStorage.getItem('isDrawerOpen');
    if (isDrawerOpen === 'true') {
      this.drawer.open();
      this.isDrawerOpen = true;
    } else {
      this.drawer.close();
      this.isDrawerOpen = false;
    }
  
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        if (this.isDrawerOpen) {
          this.drawer.open();
        } else {
          this.drawer.close();
        }
      }
    });

  }
}



