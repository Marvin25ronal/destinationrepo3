import { TestBed } from '@angular/core/testing';

import { CouncilmembertypeService } from './councilmembertype.service';

describe('CouncilmembertypeService', () => {
  let service: CouncilmembertypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouncilmembertypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
