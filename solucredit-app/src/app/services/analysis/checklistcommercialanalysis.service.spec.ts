import { TestBed } from '@angular/core/testing';

import { ChecklistcommercialanalysisService } from './checklistcommercialanalysis.service';

describe('ChecklistcommercialanalysisService', () => {
  let service: ChecklistcommercialanalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistcommercialanalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
