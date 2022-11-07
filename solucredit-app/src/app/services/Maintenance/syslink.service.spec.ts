import { TestBed } from '@angular/core/testing';

import { SyslinkService } from './syslink.service';

describe('SyslinkService', () => {
  let service: SyslinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyslinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
