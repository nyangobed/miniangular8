import { TestBed } from '@angular/core/testing';

import { PartsHistoryService } from './parts-history.service';

describe('PartsHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartsHistoryService = TestBed.get(PartsHistoryService);
    expect(service).toBeTruthy();
  });
});
