import { TestBed } from '@angular/core/testing';

import { UploaddocumentscaService } from './uploaddocumentsca.service';

describe('UploaddocumentscaService', () => {
  let service: UploaddocumentscaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploaddocumentscaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
