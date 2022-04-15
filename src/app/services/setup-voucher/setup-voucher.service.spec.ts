import { TestBed } from '@angular/core/testing';

import { SetupVoucherService } from './setup-voucher.service';

describe('SetupVoucherService', () => {
  let service: SetupVoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupVoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
