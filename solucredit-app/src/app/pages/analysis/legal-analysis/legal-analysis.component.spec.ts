import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAnalysisComponent } from './legal-analysis.component';

describe('LegalAnalysisComponent', () => {
  let component: LegalAnalysisComponent;
  let fixture: ComponentFixture<LegalAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
