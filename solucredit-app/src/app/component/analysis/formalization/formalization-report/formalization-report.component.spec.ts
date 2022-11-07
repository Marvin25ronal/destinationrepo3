import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalizationReportComponent } from './formalization-report.component';

describe('FormalizationReportComponent', () => {
  let component: FormalizationReportComponent;
  let fixture: ComponentFixture<FormalizationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalizationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
