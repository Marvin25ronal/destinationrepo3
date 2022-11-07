import { TestBed } from '@angular/core/testing';

import { AllAnalysisService } from './all-analysis.service';

describe('AllAnalysisService', () => {
  let service: AllAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
