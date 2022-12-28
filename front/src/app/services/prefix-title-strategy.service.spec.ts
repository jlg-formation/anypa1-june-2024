import { TestBed } from '@angular/core/testing';

import { PrefixTitleStrategyService } from './prefix-title-strategy.service';

describe('PrefixTitleStrategyService', () => {
  let service: PrefixTitleStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefixTitleStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
