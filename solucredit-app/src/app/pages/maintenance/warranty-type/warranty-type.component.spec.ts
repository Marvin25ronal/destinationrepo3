import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyTypeComponent } from './warranty-type.component';

describe('WarrantyTypeComponent', () => {
  let component: WarrantyTypeComponent;
  let fixture: ComponentFixture<WarrantyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
