import { TestBed } from '@angular/core/testing';

import { SysivaService } from './sysiva.service';

describe('SysivaService', () => {
  let service: SysivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
