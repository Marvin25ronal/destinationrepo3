import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegistrationTabComponent } from './customer-registration-tab.component';

describe('CustomerRegistrationTabComponent', () => {
  let component: CustomerRegistrationTabComponent;
  let fixture: ComponentFixture<CustomerRegistrationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRegistrationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegistrationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
