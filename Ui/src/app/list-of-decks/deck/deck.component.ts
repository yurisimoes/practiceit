import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { GamesRepository } from "../../games/games.repository";
import { Deck, DecksRepository } from "../decks.repository";
import { ListsOfDecksService } from "../lists-of-decks.service";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() deck!: Deck
  private addedNumbers: number[] = [];

  constructor(private decksService: ListsOfDecksService, private repo: DecksRepository, private router: Router, private gamesRepo: GamesRepository) {
  }

  deleteDeck(deckId: number) {
    this.decksService.deleteDeck(deckId).subscribe(() => this.repo.deleteDeck(deckId))
  }

  playGames(id: number) {
    const index = this.addedNumbers.indexOf(id);
    if (index !== -1) {
      this.addedNumbers.splice(index, 1);
      this.gamesRepo.deleteGame(id)
    } else {
      this.addedNumbers.push(id);
      this.gamesRepo.addGame(id);
    }
  }

  playGame(id: number) {
    this.gamesRepo.addGame(id);
    this.router.navigateByUrl('/games')
  }
}
