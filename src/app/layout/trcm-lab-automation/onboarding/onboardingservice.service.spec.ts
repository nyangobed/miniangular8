import { TestBed } from '@angular/core/testing';

import { OnboardingserviceService } from './onboardingservice.service';

describe('OnboardingserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardingserviceService = TestBed.get(OnboardingserviceService);
    expect(service).toBeTruthy();
  });
});
