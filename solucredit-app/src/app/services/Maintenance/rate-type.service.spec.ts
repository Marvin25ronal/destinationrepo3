import { TestBed } from '@angular/core/testing';

import { RateTypeService } from './rate-type.service';

describe('RateTypeService', () => {
  let service: RateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
