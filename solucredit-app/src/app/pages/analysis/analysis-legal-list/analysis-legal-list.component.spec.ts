import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisLegalListComponent } from './analysis-legal-list.component';

describe('AnalysisLegalListComponent', () => {
  let component: AnalysisLegalListComponent;
  let fixture: ComponentFixture<AnalysisLegalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisLegalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisLegalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
