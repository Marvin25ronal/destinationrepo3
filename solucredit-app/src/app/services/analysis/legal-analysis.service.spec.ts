import { TestBed } from '@angular/core/testing';

import { LegalAnalysisService } from './legal-analysis.service';

describe('LegalAnalysisService', () => {
  let service: LegalAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
