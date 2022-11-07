import { TestBed } from '@angular/core/testing';

import { TerritorialcoverageService } from './territorialcoverage.service';

describe('TerritorialcoverageService', () => {
  let service: TerritorialcoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerritorialcoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
