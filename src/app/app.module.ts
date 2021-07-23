import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { DevicesDashboardComponent } from './components/devices-dashboard/devices-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    DevicesDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
