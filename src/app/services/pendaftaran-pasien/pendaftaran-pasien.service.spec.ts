import { TestBed } from '@angular/core/testing';

import { PendaftaranPasienService } from './pendaftaran-pasien.service';

describe('PendaftaranPasienService', () => {
  let service: PendaftaranPasienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendaftaranPasienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
