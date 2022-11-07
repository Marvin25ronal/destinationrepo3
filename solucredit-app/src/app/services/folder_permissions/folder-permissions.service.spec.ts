import { TestBed } from '@angular/core/testing';

import { FolderPermissionsService } from './folder-permissions.service';

describe('FolderPermissionsService', () => {
  let service: FolderPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
