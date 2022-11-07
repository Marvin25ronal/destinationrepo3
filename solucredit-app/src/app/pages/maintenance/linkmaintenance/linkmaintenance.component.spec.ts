import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkmaintenanceComponent } from './linkmaintenance.component';

describe('LinkmaintenanceComponent', () => {
  let component: LinkmaintenanceComponent;
  let fixture: ComponentFixture<LinkmaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkmaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
