import { TestBed } from '@angular/core/testing';

import { AditionalrevService } from './aditionalrev.service';

describe('AditionalrevService', () => {
  let service: AditionalrevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AditionalrevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
