import { TestBed } from '@angular/core/testing';

import { LoanService } from './loan.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(LoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
