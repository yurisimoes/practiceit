import { TestBed } from '@angular/core/testing';

import { ListsOfDecksService } from './lists-of-decks.service';

describe('ListsOfDecksService', () => {
  let service: ListsOfDecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsOfDecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
