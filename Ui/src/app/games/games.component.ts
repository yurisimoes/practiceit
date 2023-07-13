import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap, take } from 'rxjs';
import { GamesRepository } from './games.repository';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  games$ = this.gamesRepo.games$;
  gamesToPlay = this.gamesRepo.gamesToPlay$;

  constructor(
    private gameService: GamesService,
    private activatedRoute: ActivatedRoute,
    private gamesRepo: GamesRepository
  ) {
    this.gamesToPlay
      .pipe(
        take(1),
        finalize(() => {
          this.gameService.clearSideNavGames();
        }),
        switchMap((x) => {
          const ids = x.map((x) => x.id);
          return this.gameService.getGames(ids).pipe(takeUntilDestroyed());
        })
      )
      .subscribe();
  }
}
