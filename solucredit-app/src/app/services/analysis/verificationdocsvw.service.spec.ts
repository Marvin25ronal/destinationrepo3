import { TestBed } from '@angular/core/testing';

import { VerificationdocsvwService } from './verificationdocsvw.service';

describe('VerificationdocsvwService', () => {
  let service: VerificationdocsvwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationdocsvwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
