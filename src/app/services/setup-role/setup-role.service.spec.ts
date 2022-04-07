import { TestBed } from '@angular/core/testing';

import { SetupRoleService } from './setup-role.service';

describe('SetupRoleService', () => {
  let service: SetupRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
