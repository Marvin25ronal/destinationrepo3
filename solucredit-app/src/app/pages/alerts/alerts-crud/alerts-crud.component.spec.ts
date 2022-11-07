import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsCrudComponent } from './alerts-crud.component';

describe('AlertsCrudComponent', () => {
  let component: AlertsCrudComponent;
  let fixture: ComponentFixture<AlertsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
