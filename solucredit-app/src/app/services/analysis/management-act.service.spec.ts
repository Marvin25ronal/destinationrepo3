import { TestBed } from '@angular/core/testing';

import { ManagementActService } from './management-act.service';

describe('ManagementActService', () => {
  let service: ManagementActService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementActService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
