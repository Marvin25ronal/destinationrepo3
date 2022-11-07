import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomoptionComponent } from './customoption.component';

describe('CustomoptionComponent', () => {
  let component: CustomoptionComponent;
  let fixture: ComponentFixture<CustomoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
