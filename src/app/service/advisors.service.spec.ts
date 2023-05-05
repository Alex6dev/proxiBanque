import { TestBed } from '@angular/core/testing';

import { AdvisorsService } from './advisors.service';

describe('AdvisorsService', () => {
  let service: AdvisorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
