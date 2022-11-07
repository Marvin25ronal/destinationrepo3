import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionSheetChecklistComponent } from './condition-sheet-checklist.component';

describe('ConditionSheetChecklistComponent', () => {
  let component: ConditionSheetChecklistComponent;
  let fixture: ComponentFixture<ConditionSheetChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionSheetChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionSheetChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
