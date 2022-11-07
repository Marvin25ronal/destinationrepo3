import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserTypeComponent } from './adviser-type.component';

describe('AdviserTypeComponent', () => {
  let component: AdviserTypeComponent;
  let fixture: ComponentFixture<AdviserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
