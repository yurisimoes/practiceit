import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { CardsService } from "../cards/cards.service";
import { Deck, DecksRepository } from "./decks.repository";

@Injectable({
  providedIn: 'root'
})
export class ListsOfDecksService {

  constructor(private http: HttpClient, private repo: DecksRepository, private cardsService: CardsService) { }

  get() {
    return this.http.get<Deck[]>("/api/decks").pipe(tap(this.repo.setDecks))
  }

  deleteDeck(id: number, category?: number) {
    return this.cardsService.delete(id);
  }
}
