import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenStorageService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
