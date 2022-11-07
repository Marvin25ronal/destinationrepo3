import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFormComponent } from './all-form.component';

describe('AllFormComponent', () => {
  let component: AllFormComponent;
  let fixture: ComponentFixture<AllFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
