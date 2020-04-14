import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService]
    });
  });

  it('should be created', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
  it('should get array', inject([CustomerService], (service: CustomerService) => {
    service.getCustomerBasic().subscribe(
      res => {
        expect(res).toBe(Array);
      }
    ); 
  }));
});
