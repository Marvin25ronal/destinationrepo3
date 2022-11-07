import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocWarrantyComponent } from './doc-warranty.component';

describe('DocWarrantyComponent', () => {
  let component: DocWarrantyComponent;
  let fixture: ComponentFixture<DocWarrantyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocWarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
