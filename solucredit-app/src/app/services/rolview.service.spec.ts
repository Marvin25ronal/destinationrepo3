import { TestBed } from '@angular/core/testing';

import { RolviewService } from './rolview.service';

describe('RolviewService', () => {
  let service: RolviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
