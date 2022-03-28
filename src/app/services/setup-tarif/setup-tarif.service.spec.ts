import { TestBed } from '@angular/core/testing';

import { SetupTarifService } from './setup-tarif.service';

describe('SetupTarifService', () => {
  let service: SetupTarifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupTarifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
