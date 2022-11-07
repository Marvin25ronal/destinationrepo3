import { TestBed } from '@angular/core/testing';

import { DeedDocumentService } from './deed-document.service';

describe('DeedDocumentService', () => {
  let service: DeedDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeedDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
