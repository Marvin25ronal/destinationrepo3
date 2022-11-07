import { TestBed } from '@angular/core/testing';

import { WfDocumentService } from './wf-document.service';

describe('WfDocumentService', () => {
  let service: WfDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
