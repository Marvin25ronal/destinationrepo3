import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceVerificationListComponent } from './compliance-verification-list.component';

describe('ComplianceVerificationListComponent', () => {
  let component: ComplianceVerificationListComponent;
  let fixture: ComponentFixture<ComplianceVerificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceVerificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceVerificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
