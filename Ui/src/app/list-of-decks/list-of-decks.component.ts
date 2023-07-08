import { Component } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { GamesRepository } from "../games/games.repository";
import { DecksRepository } from "./decks.repository";
import { ListsOfDecksService } from "./lists-of-decks.service";

@Component({
  selector: 'app-list-of-decks',
  templateUrl: './list-of-decks.component.html',
  styleUrls: ['./list-of-decks.component.scss']
})
export class ListOfDecksComponent {
  decks$ = this.repo.decks$;
  games$ = this.gameRepo.gamesToPlay$;


  constructor(private listsOfDecks: ListsOfDecksService, private repo: DecksRepository, private gameRepo: GamesRepository, private router: Router) {
    this.listsOfDecks.get().pipe(takeUntilDestroyed()).subscribe();
  }

  playGames() {
    this.router.navigateByUrl('/games')
  }
}
