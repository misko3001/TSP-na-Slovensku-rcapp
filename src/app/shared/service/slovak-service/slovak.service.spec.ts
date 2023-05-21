import { TestBed } from '@angular/core/testing';

import { SlovakService } from './slovak.service';

describe('SlovakService', () => {
  let service: SlovakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlovakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
