import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Componets/sign-up/sign-up.component';
import { SignInComponent } from './Componets/sign-in/sign-in.component';
import { OurServicesComponent } from './componets/our-services/our-services.component';
import { NadyComponent } from './componets/nady/nady.component';
import { LandingComponent } from './Componets/landing/landing.component';
import { AboutComponent } from './componets/about/about.component';
import { AttandenceComponent } from './componets/attandence/attandence.component';
import { FundayComponent } from './Componets/funday/funday.component';

const routes: Routes = [
  {path: 'signUp', component:SignUpComponent},
  {path: 'signIn',component:SignInComponent},
  // {path: '',component:OurServicesComponent},
  {path: 'services',component:OurServicesComponent},
  {path: 'nady',component:NadyComponent},
  {path: 'about',component:AboutComponent},
  {path: 'attendance',component:AttandenceComponent},
  {path: 'funday',component:FundayComponent},
  {path: '',component:LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
