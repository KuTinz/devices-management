import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getEmployee() {
    return this.http.get<any>("http://localhost:3000/posts")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateEmployee(id: number, data:any) {
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  deleteEmployeeApi(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  ////////////////////////////////// device ///////////////////////////////
  postDevice(data: any) {
    return this.http.post<any>("http://localhost:3000/comments", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getDevice() {
    return this.http.get<any>("http://localhost:3000/comments")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateDevice(id: number, data:any) {
    return this.http.put<any>("http://localhost:3000/comments/"+id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  deleteDeviceApi(id: number) {
    return this.http.delete<any>("http://localhost:3000/comments/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
