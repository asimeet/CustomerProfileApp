import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSideNavComponent } from './master-side-nav.component';

describe('MasterSideNavComponent', () => {
  let component: MasterSideNavComponent;
  let fixture: ComponentFixture<MasterSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
