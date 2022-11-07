import { TestBed } from '@angular/core/testing';

import { CouncilmembersService } from './councilmembers.service';

describe('CouncilmembersService', () => {
  let service: CouncilmembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouncilmembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
