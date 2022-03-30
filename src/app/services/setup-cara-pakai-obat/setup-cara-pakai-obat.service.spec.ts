import { TestBed } from '@angular/core/testing';

import { SetupCaraPakaiObatService } from './setup-cara-pakai-obat.service';

describe('SetupCaraPakaiObatService', () => {
  let service: SetupCaraPakaiObatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupCaraPakaiObatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
