import { TestBed } from '@angular/core/testing';

import { InspectionPlaceService } from './inspection-place.service';

describe('InspectionPlaceService', () => {
  let service: InspectionPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
