import { TestBed } from '@angular/core/testing';

import { PelayananPasienService } from './pelayanan-pasien.service';

describe('PelayananPasienService', () => {
  let service: PelayananPasienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelayananPasienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
