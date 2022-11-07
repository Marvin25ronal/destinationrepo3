import { TestBed } from '@angular/core/testing';

import { CommercialManagerAuthorizationService } from './commercial-manager-authorization.service';

describe('CommercialManagerAuthorizationService', () => {
  let service: CommercialManagerAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercialManagerAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
