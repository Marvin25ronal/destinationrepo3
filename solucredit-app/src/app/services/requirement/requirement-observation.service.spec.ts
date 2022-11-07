import { TestBed } from '@angular/core/testing';

import { RequirementObservationService } from './requirement-observation.service';

describe('RequirementObservationService', () => {
  let service: RequirementObservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementObservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
