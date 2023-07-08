import { Component } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs";
import { GamesRepository } from "./games.repository";
import { GamesService } from "./games.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  games$ = this.gamesRepo.games$
  private gamesToPlay = this.gamesRepo.gamesToPlay$;


  constructor(private gameService: GamesService, private activatedRoute: ActivatedRoute, private gamesRepo: GamesRepository) {
    this.gamesToPlay.pipe(takeUntilDestroyed(), finalize(() => this.gamesRepo.clearGamesToPlay())).subscribe((x) => {
      const ids = x.flatMap(x => x.id);
      this.gameService.getGames(ids).subscribe()
    })
  }
}
