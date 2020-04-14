import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../service/customer.service";
import {CustomerAddress} from "../model/customer-address";


@Component({
  selector: 'app-detail-cont',
  templateUrl: './detail-cont.component.html',
  styleUrls: ['./detail-cont.component.css']
})
export class DetailContComponent implements OnInit {

  constructor(private custService:CustomerService) { }

  details: any;
  newAddr: CustomerAddress;
  modalDisp: boolean;
  ngOnInit() {
    this.details = this.custService.details;
    this.custService.setEvent.subscribe( res => {
      this.details = this.custService.details;
    });
  }
  toggleModal(create=false){
    if(create == true){
      this.newAddr = new CustomerAddress();
    }
    this.modalDisp = !this.modalDisp;
  }
  addAddress(){
    this.custService.addAddress(this.newAddr).subscribe(
      res => {
        this.toggleModal();
        this.details = res;
        this.custService.setDetails();
      },
      err => {
        this.toggleModal();
        this.custService.setError(err.error.message);
      }
    );
    
  }
}
