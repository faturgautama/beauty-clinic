import { TestBed } from '@angular/core/testing';

import { SetupUserService } from './setup-user.service';

describe('SetupUserService', () => {
  let service: SetupUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
