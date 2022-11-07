import { TestBed } from '@angular/core/testing';

import { HandlerFunctionService } from './handler-function.service';

describe('HandlerFunctionService', () => {
  let service: HandlerFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
