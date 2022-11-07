import { TestBed } from '@angular/core/testing';

import { RequirementdocvwService } from './requirementdocvw.service';

describe('RequirementdocvwService', () => {
  let service: RequirementdocvwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementdocvwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
