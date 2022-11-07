import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebreportComponent } from './debreport/debreport.component';

describe('DebreportComponent', () => {
  let component: DebreportComponent;
  let fixture: ComponentFixture<DebreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
