import { Component, ElementRef, OnInit } from '@angular/core';
import { CustomerService } from "../service/customer.service";
import { CustomerBasic } from "../model/customer-basic";
import { ThrowStmt } from '@angular/compiler';
import { EventManager } from '@angular/platform-browser';

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


  constructor(private custService: CustomerService, private el: ElementRef) {

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

  getDetail(event:any, id: string) {
    this.el.nativeElement.querySelectorAll(".list-group-item").forEach(item => item.classList.remove("bg-selected"));
    event.toElement.parentElement.classList.add("bg-selected");
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
  getListGroupItemClass(id: string) {
    let classStr = "list-group-item list-group-item-action"
    if(id == this.custBasic[0].empId) classStr += " bg-selected";
    return classStr;
  }
}
