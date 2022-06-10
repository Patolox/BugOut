import { TestBed } from '@angular/core/testing';

import { BugModalService } from './bug-modal.service';

describe('BugModalService', () => {
  let service: BugModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
