import { TestBed } from '@angular/core/testing';

import { ValidatePasswordAuth0Service } from './validate-password-auth0.service';

describe('ValidatePasswordAuth0Service', () => {
  let service: ValidatePasswordAuth0Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatePasswordAuth0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
