import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContComponent } from './detail-cont.component';

describe('DetailContComponent', () => {
  let component: DetailContComponent;
  let fixture: ComponentFixture<DetailContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
