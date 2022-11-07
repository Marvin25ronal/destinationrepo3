import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsAreaReportComponent } from './operations-area-report.component';

describe('OperationsAreaReportComponent', () => {
  let component: OperationsAreaReportComponent;
  let fixture: ComponentFixture<OperationsAreaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsAreaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsAreaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
