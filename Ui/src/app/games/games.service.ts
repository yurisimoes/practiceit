import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Game, GamesRepository, GameToPlay } from './games.repository';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private decksAddedIds: number[] = [];

  constructor(private http: HttpClient, private repo: GamesRepository) {}

  getGames(ids: any[]) {
    return this.http.post<Game[]>('/api/games', ids).pipe(
      tap((x) => {
        console.log(        x.map(x => x.title.toLowerCase()))
        x.forEach(x => x.title.toLowerCase());
        this.repo.setGames(x);
      })
    );
  }

  isGameAdded(id: number): boolean {
    return this.decksAddedIds.includes(id);
  }

  playGames(game: GameToPlay) {
    const index = this.decksAddedIds.indexOf(game.id);
    if (index !== -1) {
      this.decksAddedIds.splice(index, 1);
      this.repo.deleteGame(game.id);
    } else {
      this.decksAddedIds.push(game.id);
      this.repo.addGame(game);
    }
  }

  clearSideNavGames() {
    this.repo.clearGamesToPlay();
    this.decksAddedIds = [];
  }
}
