import { TestBed } from '@angular/core/testing';

import { PartsListingService } from './parts-listing.service';

describe('PartsListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartsListingService = TestBed.get(PartsListingService);
    expect(service).toBeTruthy();
  });
});
