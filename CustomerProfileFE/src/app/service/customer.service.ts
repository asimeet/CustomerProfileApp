import { Injectable, Output, EventEmitter} from '@angular/core';
import {CustomerAddress} from '../model/customer-address';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CustomerBasic } from '../model/customer-basic';
import { s } from '@angular/core/src/render3';
import { ThrowStmt } from '@angular/compiler';

// const custBasic = [
//   { _id:  "123",
//     name: "Saloni",
//     age: "36",
//     sex: "female",
//     phone: "9123491234"
//   },
//   {
//     _id: "456",
//     name: "Nalini",
//     age: "16",
//     sex: "female",
//     phone: "9123491234"
//   }
// ];
// const custDetails = [
//   {
//     _id: "123",
//     addresses: [
//       {
//         addressLine1: `D204`,
//         addressLine2: `NFM`,
//         city: `Bangalore`,
//         stateProvince: `Karnataka`,
//         country: `India`
//       },
//       {
//         addressLine1: `SAP`,
//         addressLine2: `Kundanhalli`,
//         city: `Bangalore`,
//         stateProvince: `Karnataka`,
//         country: `India`
//       }
//     ]
//   },
//   {
//     _id: "456",
//     addresses: [
//       {
//         addressLine1: `Shander`,
//         addressLine2: `Pattandur`,
//         city: `Bangalore`,
//         stateProvince: `Karnataka`,
//         country: `India`
//       },
//       {
//         addressLine1: `Infosys`,
//         addressLine2: `Electronic City`,
//         city: `Bangalore`,
//         stateProvince: `Karnataka`,
//         country: `India`
//       }
//     ]
//   }
// ];
@Injectable()
export class CustomerService {
  @Output() setEvent = new EventEmitter<any>();
  masterId: string;
  details: any;
  custBasic:any;
  custDetails:any;
  errorMsg:string;
  constructor(private http: HttpClient) { 
    this.getCustomerBasic().subscribe(
      res => {
        this.custBasic = res;
        this.getCustomerDetails().subscribe(
          res => {
             this.custDetails = res;
             this.getDetailsById(this.custBasic[0].empId);
          }
        );
        this.setEvent.emit('customers_fetched');
      }
    );

  }
  
  private getHttpOptions(): Object {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return httpOptions;
  }

  getCustomerBasic(){
    let obs = this.http.get<any>(environment.be + '/customer/list',this.getHttpOptions());
    return obs;
  }
  getCustomerDetails(){
    return this.http.get<any>(environment.be + '/customer/list-address',this.getHttpOptions());
  }
  getDetailsById(id:string){
    this.masterId = id;
    if(this.custDetails){
      let matchedRecord = this.custDetails.find( item => item.empId == id);
      this.details = matchedRecord;
      this.setEvent.emit('details_fetched');
    }
  }
  setDetails(){
    this.getCustomerDetails().subscribe(
      res => {
         this.custDetails = res;
         this.getDetailsById(this.masterId);
      }
    );
  }
  addAddress(newAddress:CustomerAddress){
    let body ={
      empId: this.masterId,
      address: newAddress
    };
    return this.http.post<any>(environment.be + '/customer/update-address',
    JSON.stringify(body), this.getHttpOptions());
  }

  addCustomer(newCust:CustomerBasic){
    return this.http.post<any>(environment.be + '/customer/add',
    JSON.stringify(newCust), this.getHttpOptions());
  }

  setError(errorMsg:string){
    this.errorMsg = errorMsg;
    this.setEvent.emit("error_occured");
  }

}
