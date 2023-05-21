import { TestBed } from '@angular/core/testing';

import { GeoidService } from './geoid.service';

describe('GeoidService', () => {
  let service: GeoidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
