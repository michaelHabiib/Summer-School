import { trigger, transition, style, animate } from '@angular/animations';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
    animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1000ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {    
      localStorage.setItem('admin','user')
  }

}
