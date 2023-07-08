import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { Game, GamesRepository } from "./games.repository";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient, private repo: GamesRepository) { }

  getGames(ids: any[]) {
    return this.http.post<Game[]>('/api/games', ids).pipe(tap(this.repo.setGames))
  }
}
