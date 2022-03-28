import { TestBed } from '@angular/core/testing';

import { SetupDokterService } from './setup-dokter.service';

describe('SetupDokterService', () => {
  let service: SetupDokterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupDokterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
