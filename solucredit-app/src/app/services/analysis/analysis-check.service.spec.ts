import { TestBed } from '@angular/core/testing';

import { AnalysisCheckService } from './analysis-check.service';

describe('AnalysisCheckService', () => {
  let service: AnalysisCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
