import { HttpClient } from '@angular/common/http';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  deleteEntities,
  deleteAllEntities,
  addEntities,
} from '@ngneat/elf-entities';
import { Injectable } from '@angular/core';
import {
  deleteAllPages,
  getPaginationData,
  hasPage,
  setPage,
  skipWhilePageExists,
  updatePaginationData,
  withPagination,
} from '@ngneat/elf-pagination';
import { Observable, tap } from 'rxjs';
import { PaginatedData } from '../shared/models/PaginatedData';

export interface Deck {
  id: number;
  title: string;
  description: string;
  cardsCount: number;
  userId: number;
  username: string;
}

const store = createStore(
  { name: 'decks' },
  withEntities<Deck>(),
  withPagination()
);

@Injectable({ providedIn: 'root' })
export class DecksRepository {
  decks$ = store.pipe(selectAllEntities());

  constructor(private http: HttpClient) {}

  setDecks(decks: Deck[]) {
    store.update(setEntities(decks));
  }

  deleteDeck(id: Deck['id']) {
    store.update(deleteEntities(id));
  }

  get(obj: { userId?: number, search?: string; page?: number; perPage?: number }, searchUrl: string): Observable<Deck[]> {
    return this.http
      .get<PaginatedData<Deck>>(`${searchUrl}${new URLSearchParams(obj as any)}`)
      .pipe(
        tap((paginatedData) => {
          const { data, ...paginationData } = paginatedData;
          store.update(
            addEntities(data),
            updatePaginationData(paginationData),
            setPage(
              paginationData.currentPage,
              data.map((c) => c.id)
            )
          );
        }),
        skipWhilePageExists(store, obj.page!),
      );
  }

  get paginationData() {
    return store.query(getPaginationData());
  }

  get currentPage(): number {
    return this.paginationData.currentPage;
  }

  get isLast() {
    return (
      this.currentPage ==
      Math.ceil(this.paginationData.total / this.paginationData.perPage)
    );
  }

  hasPage = (page: number) => store.query(hasPage(page));

  clearCache = () => {
    store.update(deleteAllPages());
    store.update(deleteAllEntities());
  };
}
