import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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
export class AboutComponent {

}
