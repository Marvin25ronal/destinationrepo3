import { TestBed } from '@angular/core/testing';

import { SidevarService } from './sidevar.service';

describe('SidevarService', () => {
  let service: SidevarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidevarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
