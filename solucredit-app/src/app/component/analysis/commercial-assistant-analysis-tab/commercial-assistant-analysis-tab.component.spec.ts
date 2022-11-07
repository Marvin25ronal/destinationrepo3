import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialAssistantAnalysisTabComponent } from './commercial-assistant-analysis-tab.component';

describe('CommercialAssistantAnalysisTabComponent', () => {
  let component: CommercialAssistantAnalysisTabComponent;
  let fixture: ComponentFixture<CommercialAssistantAnalysisTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialAssistantAnalysisTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialAssistantAnalysisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
