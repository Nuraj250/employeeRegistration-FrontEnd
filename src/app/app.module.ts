import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-alerts';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
