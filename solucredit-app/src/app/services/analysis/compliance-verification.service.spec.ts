import { TestBed } from '@angular/core/testing';

import { ComplianceVerificationService } from './compliance-verification.service';

describe('ComplianceVerificationService', () => {
  let service: ComplianceVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
