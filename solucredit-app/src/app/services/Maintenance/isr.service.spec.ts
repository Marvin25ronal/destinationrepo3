import { TestBed } from '@angular/core/testing';

import { IsrService } from './isr.service';

describe('IsrService', () => {
  let service: IsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
