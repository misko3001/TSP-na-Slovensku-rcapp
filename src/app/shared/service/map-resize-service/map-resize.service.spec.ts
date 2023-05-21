import { TestBed } from '@angular/core/testing';

import { MapResizeService } from './map-resize.service';

describe('MapResizeService', () => {
  let service: MapResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
