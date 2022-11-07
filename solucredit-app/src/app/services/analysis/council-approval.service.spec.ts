import { TestBed } from '@angular/core/testing';

import { CouncilApprovalService } from './council-approval.service';

describe('CouncilApprovalService', () => {
  let service: CouncilApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouncilApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
