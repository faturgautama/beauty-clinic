import { TestBed } from '@angular/core/testing';

import { SetupMarketingService } from './setup-marketing.service';

describe('SetupMarketingService', () => {
  let service: SetupMarketingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupMarketingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
