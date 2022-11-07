import { TestBed } from '@angular/core/testing';

import { SidebarNameService } from './sidebar-name.service';

describe('SidebarNameService', () => {
  let service: SidebarNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
