import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsrComponent } from './isr.component';

describe('IsrComponent', () => {
  let component: IsrComponent;
  let fixture: ComponentFixture<IsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
