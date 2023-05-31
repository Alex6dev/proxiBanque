import { TestBed } from '@angular/core/testing';

import { AdvisorsService } from './advisors.service';
import { HttpClientModule } from '@angular/common/http';

describe('AdvisorsService', () => {
  let service: AdvisorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AdvisorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
