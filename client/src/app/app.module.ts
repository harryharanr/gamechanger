import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule , Http} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HospitalService } from './services/hospital.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [HospitalService , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
