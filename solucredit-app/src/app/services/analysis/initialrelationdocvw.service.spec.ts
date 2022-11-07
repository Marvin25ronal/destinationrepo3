import { TestBed } from '@angular/core/testing';

import { InitialrelationdocvwService } from './initialrelationdocvw.service';

describe('InitialrelationdocvwService', () => {
  let service: InitialrelationdocvwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialrelationdocvwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
