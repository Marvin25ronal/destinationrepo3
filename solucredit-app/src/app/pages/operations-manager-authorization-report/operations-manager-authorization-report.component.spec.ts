import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsManagerAuthorizationReportComponent } from './operations-manager-authorization-report.component';

describe('OperationsManagerAuthorizationReportComponent', () => {
  let component: OperationsManagerAuthorizationReportComponent;
  let fixture: ComponentFixture<OperationsManagerAuthorizationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsManagerAuthorizationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsManagerAuthorizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
