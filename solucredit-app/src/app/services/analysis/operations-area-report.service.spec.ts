import { TestBed } from '@angular/core/testing';

import { OperationsAreaReportService } from './operations-area-report.service';

describe('OperationsAreaReportService', () => {
  let service: OperationsAreaReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationsAreaReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
