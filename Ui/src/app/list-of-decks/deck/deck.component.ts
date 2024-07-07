import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GamesRepository, GameToPlay } from '../../games/games.repository';
import { GamesService } from "../../games/games.service";
import { Deck } from '../decks.repository';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent {
  @Input() deck!: Deck;
  @Input() playSingleGame = false;

  constructor(
    public gamesService: GamesService,
    private router: Router,
    private gamesRepo: GamesRepository,
  ) { }

  playGame(game: GameToPlay) {
    if (this.playSingleGame) {
      this.gamesRepo.addGame(game);
      this.router.navigateByUrl('/games');
    }
  }
}
