import { TestBed } from '@angular/core/testing';

import { BetCartService } from './bet-cart.service';

describe('BetCartService', () => {
  let service: BetCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
