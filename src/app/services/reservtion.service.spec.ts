import { TestBed } from '@angular/core/testing';

import { ReservtionService } from './reservtion.service';

describe('ReservtionService', () => {
  let service: ReservtionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservtionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
