import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeDashboardComponent} from "./components/employee-dashboard/employee-dashboard.component";
import {DevicesDashboardComponent} from "./components/devices-dashboard/devices-dashboard.component";

const routes: Routes = [
  { path: 'devices', component: DevicesDashboardComponent },
  { path: 'employee', component: EmployeeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
