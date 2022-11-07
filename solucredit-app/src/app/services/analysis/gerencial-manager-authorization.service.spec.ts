import { TestBed } from '@angular/core/testing';

import { GerencialManagerAuthorizationService } from './gerencial-manager-authorization.service';

describe('GerencialManagerAuthorizationService', () => {
  let service: GerencialManagerAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerencialManagerAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
