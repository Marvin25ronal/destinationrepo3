import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilApprovalReportComponent } from './council-approval-report.component';

describe('CouncilApprovalReportComponent', () => {
  let component: CouncilApprovalReportComponent;
  let fixture: ComponentFixture<CouncilApprovalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilApprovalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilApprovalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
