import { TestBed } from '@angular/core/testing';

import { PlaceHoldersService } from './place-holders.service';

describe('PlaceHoldersService', () => {
  let service: PlaceHoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceHoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
