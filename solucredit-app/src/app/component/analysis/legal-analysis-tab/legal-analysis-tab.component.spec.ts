import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAnalysisTabComponent } from './legal-analysis-tab.component';

describe('LegalAnalysisTabComponent', () => {
  let component: LegalAnalysisTabComponent;
  let fixture: ComponentFixture<LegalAnalysisTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalAnalysisTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalAnalysisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
