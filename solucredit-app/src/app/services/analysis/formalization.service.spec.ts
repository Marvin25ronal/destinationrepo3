import { TestBed } from '@angular/core/testing';

import { FormalizationService } from './formalization.service';

describe('FormalizationService', () => {
  let service: FormalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
