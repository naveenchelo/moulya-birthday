import { TestBed } from '@angular/core/testing';

import { BirthdayWishesService } from './birthday-wishes.service';

describe('BirthdayWishesService', () => {
  let service: BirthdayWishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayWishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
