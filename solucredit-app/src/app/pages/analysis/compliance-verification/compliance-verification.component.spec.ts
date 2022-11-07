import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceVerificationComponent } from './compliance-verification.component';

describe('ComplianceVerificationComponent', () => {
  let component: ComplianceVerificationComponent;
  let fixture: ComponentFixture<ComplianceVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
