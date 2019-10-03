import { TestBed } from '@angular/core/testing';

import { PartsOnboardingService } from './parts-onboarding.service';

describe('PartsOnboardingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartsOnboardingService = TestBed.get(PartsOnboardingService);
    expect(service).toBeTruthy();
  });
});
