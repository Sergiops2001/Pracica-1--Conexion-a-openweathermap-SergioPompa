import { TestBed } from '@angular/core/testing';

import { TiempoServiceService } from './tiempo-service.service';

describe('TiempoServiceService', () => {
  let service: TiempoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
