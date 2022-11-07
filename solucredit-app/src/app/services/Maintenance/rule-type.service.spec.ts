import { TestBed } from '@angular/core/testing';

import { RuleTypeService } from './rule-type.service';

describe('RuleTypeService', () => {
  let service: RuleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
