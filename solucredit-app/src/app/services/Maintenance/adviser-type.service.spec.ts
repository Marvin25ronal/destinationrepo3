import { TestBed } from '@angular/core/testing';

import { AdviserTypeService } from './adviser-type.service';

describe('AdviserTypeService', () => {
  let service: AdviserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdviserTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
