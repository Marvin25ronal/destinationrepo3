import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementActComponent } from './management-act.component';

describe('ManagementActComponent', () => {
  let component: ManagementActComponent;
  let fixture: ComponentFixture<ManagementActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
