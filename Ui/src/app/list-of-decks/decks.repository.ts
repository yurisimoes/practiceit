import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { Injectable } from '@angular/core';

export interface Deck {
  id: number;
  title: string;
  description: string;
  cardsCount: number;
}

const store = createStore({ name: 'decks' }, withEntities<Deck>());

@Injectable({ providedIn: 'root' })
export class DecksRepository {
  decks$ = store.pipe(selectAllEntities());

  setDecks(decks: Deck[]) {
    store.update(setEntities(decks));
  }

  deleteDeck(id: Deck['id']) {
    store.update(deleteEntities(id));
  }
}
