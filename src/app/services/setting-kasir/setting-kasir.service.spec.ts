import { TestBed } from '@angular/core/testing';

import { SettingKasirService } from './setting-kasir.service';

describe('SettingKasirService', () => {
  let service: SettingKasirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingKasirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
