import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  withActiveId,
  selectActiveEntity,
  setActiveId,
  withActiveIds,
  selectActiveEntities,
  toggleActiveIds,
  getEntity,
  upsertEntities
} from '@ngneat/elf-entities';
import { Injectable } from '@angular/core';

export interface DeckOfCards {
  id: number;
  title: string;
  description: string;
  cards: Card[]
}

export interface Card {
  id: number;
  key: string;
  value: string;
}

const store = createStore({name: 'decksofcards'}, withEntities<DeckOfCards>(), withActiveId(), withActiveIds());

@Injectable({providedIn: 'root'})
export class CardsRepository {
  activeDecks$ = store.pipe(selectActiveEntities());
  activeDeck$ = store.pipe(selectActiveEntity());
  decks$ = store.pipe(selectAllEntities());
  deck$ = (id: number) => store.query(getEntity(id));

  setDecks(decks: DeckOfCards[]) {
    store.update(setEntities(decks));
  }

  setDeck(deck: DeckOfCards) {
    store.update(upsertEntities([deck]));
  }

  addDeck(deck: DeckOfCards) {
    store.update(addEntities(deck));
  }

  updateDeck(id: DeckOfCards['id'], deck: Partial<DeckOfCards>) {
    store.update(updateEntities(id, deck));
  }

  deleteDeck(id: DeckOfCards['id']) {
    store.update(deleteEntities(id));
  }

  setActiveId(id: DeckOfCards['id']) {
    store.update(setActiveId(id));
  }

  toggleActiveIds(ids: Array<DeckOfCards['id']>) {
    store.update(toggleActiveIds(ids));
  }
}
