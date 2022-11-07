import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredInputMessageComponent } from './required-input-message.component';

describe('RequiredInputMessageComponent', () => {
  let component: RequiredInputMessageComponent;
  let fixture: ComponentFixture<RequiredInputMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredInputMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredInputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
