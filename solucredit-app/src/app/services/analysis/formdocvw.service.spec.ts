import { TestBed } from '@angular/core/testing';

import { FormdocvwService } from './formdocvw.service';

describe('FormdocvwService', () => {
  let service: FormdocvwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormdocvwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
