import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaTypeComponent } from './quota-type.component';

describe('QuotaTypeComponent', () => {
  let component: QuotaTypeComponent;
  let fixture: ComponentFixture<QuotaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
