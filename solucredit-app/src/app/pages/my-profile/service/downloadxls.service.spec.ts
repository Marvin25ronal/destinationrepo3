import { TestBed } from '@angular/core/testing';

import { DownloadxlsService } from './downloadxls.service';

describe('DownloadxlsService', () => {
  let service: DownloadxlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadxlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
