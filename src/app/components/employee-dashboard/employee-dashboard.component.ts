import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {EmployeeModel} from "../../models/employee.model";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  isAdd !: boolean;
  isUpdated !: boolean;
  formValue !: FormGroup

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        name: [''],
        gender: [''],
        phone: [''],
        email: [''],
        date: [''],
      })
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.isAdd = true;
    this.isUpdated = false;
  }

  postEmployDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.date = this.formValue.value.date;

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
        console.log(res);
        alert("Add Successful")
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      error => {
        alert("Add Error")
      })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row: any) {
    // alert("click" + row.id)
    this.api.deleteEmployeeApi(row.id).subscribe(
      res => {
        alert("deleted");
        this.getAllEmployee();
      }
    )
  }

  editEmployee(row: any) {
    this.isAdd = false;
    this.isUpdated = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['date'].setValue(row.date);
  }

  updateEmployDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.date = this.formValue.value.date;

    this.api.updateEmployee(this.employeeModelObj.id, this.employeeModelObj)
      .subscribe(
        res => {
          alert("Updated Successful");
          let ref = document.getElementById("cancel")
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        }
      )
  }
}
