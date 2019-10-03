import { TestBed, inject } from '@angular/core/testing';

import {UserManagementServices} from './usermanagement.service';

describe('UserManagementServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementServices]
    });
  });

  it('should be created', inject([UserManagementServices], (service: UserManagementServices) => {
    expect(service).toBeTruthy();
  }));
});
