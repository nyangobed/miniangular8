import { TestBed, inject } from '@angular/core/testing';

import { HttpStewardService } from './http-steward.service';

describe('HttpStewardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpStewardService]
    });
  });

  it('should be created', inject([HttpStewardService], (service: HttpStewardService<any, any>) => {
    expect(service).toBeTruthy();
  }));
});
