import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeddocumentComponent } from './deeddocument.component';

describe('DeeddocumentComponent', () => {
  let component: DeeddocumentComponent;
  let fixture: ComponentFixture<DeeddocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeeddocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
