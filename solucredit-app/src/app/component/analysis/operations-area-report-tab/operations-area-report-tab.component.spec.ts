import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsAreaReportTabComponent } from './operations-area-report-tab.component';

describe('OperationsAreaReportTabComponent', () => {
  let component: OperationsAreaReportTabComponent;
  let fixture: ComponentFixture<OperationsAreaReportTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsAreaReportTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsAreaReportTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
