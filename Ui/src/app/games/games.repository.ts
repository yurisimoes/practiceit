import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  updateEntities,
  deleteEntities,
  withUIEntities,
  UIEntitiesRef,
  upsertEntities,
  deleteAllEntities, selectEntitiesCount,
} from '@ngneat/elf-entities';
import { Injectable } from '@angular/core';
import { Card } from '../cards/cards.repository';

export interface Game {
  id: number;
  title: string;
  description: string;
  cards: Card[];
}

export interface GameToPlay {
  id: number;
  title: string;
  description: string;
  cardsCount: number;
  userId: number;
  username: string;
}

const store = createStore(
  { name: 'game' },
  withEntities<Game>(),
  withUIEntities<GameToPlay>()
);

@Injectable({ providedIn: 'root' })
export class GamesRepository {
  games$ = store.pipe(selectAllEntities());
  gamesToPlay$ = store.pipe(selectAllEntities({ ref: UIEntitiesRef }));
  totalOfGamesToPlay$ = store.pipe(selectEntitiesCount({ ref: UIEntitiesRef }));

  setGames(game: Game[]) {
    store.update(setEntities(game));
  }

  addGame(game: GameToPlay) {
    store.update(upsertEntities(game, { ref: UIEntitiesRef }));
  }

  deleteGame(id: number) {
    store.update(deleteEntities(id, { ref: UIEntitiesRef }));
  }

  clearGamesToPlay() {
    store.update(deleteAllEntities({ ref: UIEntitiesRef }));
  }

  updateGame(id: Game['id'], game: Partial<Game>) {
    store.update(updateEntities(id, game));
  }
}
