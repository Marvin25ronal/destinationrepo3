import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialManagerAuthorizationTabComponent } from './commercial-manager-authorization-tab.component';

describe('CommercialManagerAuthorizationTabComponent', () => {
  let component: CommercialManagerAuthorizationTabComponent;
  let fixture: ComponentFixture<CommercialManagerAuthorizationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialManagerAuthorizationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialManagerAuthorizationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
