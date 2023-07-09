import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { DeckOfCards, CardsRepository } from "./cards.repository";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private repo: CardsRepository, private http: HttpClient) {
  }

  add(body: DeckOfCards) {
    return this.http.post<DeckOfCards>("/api/decks-of-cards", body);
  }

  get() {
    return this.http.get<DeckOfCards[]>("/api/decks-of-cards").pipe(tap(this.repo.setDecks));
  }

  getById(id: number) {
    return this.http
      .get<DeckOfCards>(`/api/decks-of-cards/${id}`)
      .pipe(tap(this.repo.setDeck));
  }

  delete(id: number) {
    return this.http.delete(`/api/decks-of-cards/${id}`);
  }

  update(id: number, body: Partial<DeckOfCards>) {
    return this.http.put(`/api/decks-of-cards/${id}`, body);
  }
}
