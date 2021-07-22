import { TestBed } from '@angular/core/testing';

import { StaffProfileService } from './staff-profile.service';

describe('StaffProfileService', () => {
  let service: StaffProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
