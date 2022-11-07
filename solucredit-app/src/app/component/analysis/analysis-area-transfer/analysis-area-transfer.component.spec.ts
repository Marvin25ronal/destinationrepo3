import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisAreaTransferComponent } from './analysis-area-transfer.component';

describe('AnalysisAreaTransferComponent', () => {
  let component: AnalysisAreaTransferComponent;
  let fixture: ComponentFixture<AnalysisAreaTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisAreaTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisAreaTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
