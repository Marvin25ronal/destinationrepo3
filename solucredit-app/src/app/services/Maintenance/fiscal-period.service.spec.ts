import { TestBed } from '@angular/core/testing';

import { FiscalPeriodService } from './fiscal-period.service';

describe('FiscalPeriodService', () => {
  let service: FiscalPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
