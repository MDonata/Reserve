import { TestBed } from '@angular/core/testing';

import { ReserveApiService } from './reserve-api.service';

describe('ReserveApiService', () => {
  let service: ReserveApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
