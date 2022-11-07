import { TestBed } from '@angular/core/testing';

import { WarrantytypeService } from './warrantytype.service';

describe('WarrantytypeService', () => {
  let service: WarrantytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarrantytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
