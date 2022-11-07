import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionSheetComponent } from './condition-sheet.component';

describe('ConditionSheetComponent', () => {
  let component: ConditionSheetComponent;
  let fixture: ComponentFixture<ConditionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
