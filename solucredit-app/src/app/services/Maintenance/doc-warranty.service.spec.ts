import { TestBed } from '@angular/core/testing';

import { DocWarrantyService } from './doc-warranty.service';

describe('DocWarrantyService', () => {
  let service: DocWarrantyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocWarrantyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
