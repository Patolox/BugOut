import { TestBed } from '@angular/core/testing';

import { UserModalService } from './user-modal.service';

describe('UserModalService', () => {
  let service: UserModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
