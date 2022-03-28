import { TestBed } from '@angular/core/testing';

import { SetupObatService } from './setup-obat.service';

describe('SetupObatService', () => {
  let service: SetupObatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupObatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
