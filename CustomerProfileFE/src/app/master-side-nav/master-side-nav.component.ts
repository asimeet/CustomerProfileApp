import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../service/customer.service";
import { CustomerBasic } from "../model/customer-basic";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-master-side-nav',
  templateUrl: './master-side-nav.component.html',
  styleUrls: ['./master-side-nav.component.css']
})
export class MasterSideNavComponent implements OnInit {
  custBasic: Array<any> = [];
  custModal: Boolean = false;
  newCust: CustomerBasic;
  searchText: string;


  constructor(private custService: CustomerService) {

  }

  ngOnInit() {
    this.custService.setEvent.subscribe(
      res => {
        if (res == "customers_fetched") {
          this.custBasic = this.custService.custBasic;
        }
      }
    );
  }

  getDetail(id: string) {
    this.custService.getDetailsById(id);
  }
  toggleModal(create = false) {
    if (create == true) {
      this.newCust = new CustomerBasic();
    }
    this.custModal = !this.custModal;
  }
  addCustomer() {
    this.custService.addCustomer(this.newCust).subscribe(
      res => {
        this.toggleModal();
        this.custBasic.push(res);
      },
      err => {
        this.toggleModal();
        this.custService.setError(err.error.message);
      }
    )
  }
}
