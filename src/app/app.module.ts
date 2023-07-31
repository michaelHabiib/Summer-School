import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrialModule } from './matrial/matrial.module';
import { NavbarComponent } from './Componets/navbar/navbar.component';
import { FooterComponent } from './Componets/footer/footer.component';
import { LandingComponent } from './Componets/landing/landing.component';
import { SignUpComponent } from './Componets/sign-up/sign-up.component';
import { SignInComponent } from './Componets/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OurServicesComponent } from './componets/our-services/our-services.component';
import { NadyComponent } from './componets/nady/nady.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './componets/about/about.component';
import { AttandenceComponent } from './componets/attandence/attandence.component';
import { FundayComponent } from './Componets/funday/funday.component';
import { NadyResultComponent } from './Componets/nady-result/nady-result.component';
import { ContactUsComponent } from './Componets/contact-us/contact-us.component';
import { EventSummerClubComponent } from './Componets/event-summer-club/event-summer-club.component';
import { FundayEventComponent } from './Componets/funday-event/funday-event.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    SignUpComponent,
    SignInComponent,
    OurServicesComponent,
    NadyComponent,
    AboutComponent,
    AttandenceComponent,
    FundayComponent,
    NadyResultComponent,
    ContactUsComponent,
    EventSummerClubComponent,
    FundayEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatrialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
