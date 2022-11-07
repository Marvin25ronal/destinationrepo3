import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTabComponent } from './analysis-tab.component';

describe('AnalysisTabComponent', () => {
  let component: AnalysisTabComponent;
  let fixture: ComponentFixture<AnalysisTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
