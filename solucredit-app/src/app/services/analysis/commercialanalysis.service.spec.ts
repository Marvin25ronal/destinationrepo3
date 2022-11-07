import { TestBed } from '@angular/core/testing';

import { CommercialanalysisService } from './commercialanalysis.service';

describe('CommercialanalysisService', () => {
  let service: CommercialanalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercialanalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
