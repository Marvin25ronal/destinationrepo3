import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsLogComponent } from './alerts-log.component';

describe('AlertsLogComponent', () => {
  let component: AlertsLogComponent;
  let fixture: ComponentFixture<AlertsLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
