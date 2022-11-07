import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPlaceComponent } from './inspection-place.component';

describe('InspectionPlaceComponent', () => {
  let component: InspectionPlaceComponent;
  let fixture: ComponentFixture<InspectionPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
