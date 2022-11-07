import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceVerificationTabComponent } from './compliance-verification-tab.component';

describe('ComplianceVerificationTabComponent', () => {
  let component: ComplianceVerificationTabComponent;
  let fixture: ComponentFixture<ComplianceVerificationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceVerificationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceVerificationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
