import { TestBed } from '@angular/core/testing';

import { ResepService } from './resep.service';

describe('ResepService', () => {
  let service: ResepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
