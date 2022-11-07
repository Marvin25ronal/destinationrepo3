import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteriskrequiredComponent } from './asteriskrequired.component';

describe('AsteriskrequiredComponent', () => {
  let component: AsteriskrequiredComponent;
  let fixture: ComponentFixture<AsteriskrequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsteriskrequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsteriskrequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
