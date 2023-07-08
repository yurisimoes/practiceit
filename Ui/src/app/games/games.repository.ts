import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  withUIEntities,
  UIEntitiesRef, upsertEntities, deleteAllEntities
} from '@ngneat/elf-entities';
import { Injectable } from '@angular/core';
import { Card } from "../cards/cards.repository";

export interface Game {
  id: number;
  title: string;
  description: string;
  cards: Card[]
}

const store = createStore({name: 'game'}, withEntities<Game>(), withUIEntities<any>());

@Injectable({providedIn: 'root'})
export class GamesRepository {
  games$ = store.pipe(selectAllEntities());
  gamesToPlay$ = store.pipe(selectAllEntities({ref: UIEntitiesRef}));

  setGames(game: Game[]) {
    store.update(setEntities(game));
  }

  addGame(id: number) {
    store.update(upsertEntities({id: id}, {ref: UIEntitiesRef}))
  }

  deleteGame(id: number) {
    store.update(deleteEntities(id, {ref: UIEntitiesRef}));
  }

  clearGamesToPlay() {
    store.update(deleteAllEntities({ref: UIEntitiesRef}))
  }

  updateGame(id: Game['id'], game: Partial<Game>) {
    store.update(updateEntities(id, game));
  }
}
