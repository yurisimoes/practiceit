import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { GamesRepository, GameToPlay } from '../../games/games.repository';
import { GamesService } from "../../games/games.service";
import { Deck, DecksRepository } from '../decks.repository';
import { ListsOfDecksService } from '../lists-of-decks.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent {
  @Input() deck!: Deck;
  @Input() playSingleGame = false;

  constructor(
    private decksService: ListsOfDecksService,
    private repo: DecksRepository,
    public gamesService: GamesService,
    private router: Router,
    private gamesRepo: GamesRepository
  ) {}

  deleteDeck(deckId: number) {
    this.decksService
      .deleteDeck(deckId)
      .pipe(
        tap({
          complete: () => {
            this.gamesRepo.deleteGame(deckId);
            this.repo.deleteDeck(deckId);
          },
        })
      )
      .subscribe();
  }

  playGame(game: GameToPlay) {
    if (this.playSingleGame) {
      this.gamesRepo.addGame(game);
      this.router.navigateByUrl('/games');
    }
  }
}
