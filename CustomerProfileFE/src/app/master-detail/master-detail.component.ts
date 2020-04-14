import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer.service';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {
  errorMsg: string;
  showModal: boolean = false;
  constructor(private custService:CustomerService) { }
  ngOnInit() {
    this.custService.setEvent.subscribe(
      res => {
        if(res == "error_occured"){
          this.errorMsg = this.custService.errorMsg;
          this.showModal = true;
        } 
      }
    );
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
