import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DeviceModel} from "../../models/device.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-devices-dashboard',
  templateUrl: './devices-dashboard.component.html',
  styleUrls: ['./devices-dashboard.component.scss']
})
export class DevicesDashboardComponent implements OnInit {

  deviceModelObj: DeviceModel = new DeviceModel();
  deviceData !: any;
  dataFrommApi !: any;
  isAdd !: boolean;
  isUpdated !: boolean;
  formValue !: FormGroup;

  imageSrc: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        device: [''],
        type: [''],
        status: [''],
        employee: [''],
        description: [''],
        image: [''],
      })
    this.getAllDevice();
    this.getAllDataEmployeeName();
  }

  clickAddDevices() {
    this.formValue.reset();
    this.isAdd = true;
    this.isUpdated = false;
  }

  editDevice(row: any) {
    this.isAdd = false;
    this.isUpdated = true;
    this.deviceModelObj.id = row.id;
    this.formValue.controls['device'].setValue(row.device);
    this.formValue.controls['type'].setValue(row.type);
    this.formValue.controls['status'].setValue(row.status);
    this.formValue.controls['employee'].setValue(row.employee);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['image'].setValue(row.image);
  }

  deleteDevice(row: any) {
    this.api.deleteDeviceApi(row.id).subscribe(
      res => {
        alert("deleted");
        this.getAllDevice();
      }
    )

  }

  getAllDataEmployeeName() {
    this.api.getEmployee().subscribe(res =>{
      this.dataFrommApi = res
    })
  }

  getAllDevice() {
    this.api.getDevice().subscribe(res => {
      this.deviceData = res;
    })
  }

  postDeviceDetails() {
    this.deviceModelObj.device = this.formValue.value.device;
    this.deviceModelObj.type = this.formValue.value.type;
    this.deviceModelObj.status = this.formValue.value.status;
    this.deviceModelObj.employee = this.formValue.value.employee;
    this.deviceModelObj.description = this.formValue.value.description;
    this.deviceModelObj.image = this.formValue.value.image;

    this.api.postDevice(this.deviceModelObj).subscribe(res => {
        console.log(res);
        alert("Add Successful")
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllDevice();
      },
      error => {
        alert("Add Error")
      })

  }

  updateDeviceDetails() {
    this.deviceModelObj.device = this.formValue.value.device;
    this.deviceModelObj.type = this.formValue.value.type;
    this.deviceModelObj.status = this.formValue.value.status;
    this.deviceModelObj.employee = this.formValue.value.employee;
    this.deviceModelObj.description = this.formValue.value.description;
    this.deviceModelObj.image = this.formValue.value.image;

    this.api.updateDevice(this.deviceModelObj.id, this.deviceModelObj)
      .subscribe(
        res => {
          alert("Updated Successful");
          let ref = document.getElementById("cancel")
          ref?.click();
          this.formValue.reset();
          this.getAllDevice();
        }
      )
  }

  onselectFile(event: Event): void {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
