import { TestBed } from '@angular/core/testing';

import { InstructorPermissionService } from './instructor-permission.service';

describe('InstructorPermissionService', () => {
  let service: InstructorPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
