import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAnalysisReportComponent } from './financial-analysis-report.component';

describe('FinancialAnalysisReportComponent', () => {
  let component: FinancialAnalysisReportComponent;
  let fixture: ComponentFixture<FinancialAnalysisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialAnalysisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
