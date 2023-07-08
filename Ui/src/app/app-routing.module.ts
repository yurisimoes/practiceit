import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lists-of-decks',
  },
  {
    path: 'lists-of-decks',
    loadChildren: () =>
      import('./list-of-decks/list-of-decks.module').then((m) => m.ListOfDecksModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./games/games.module').then((m) => m.GamesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
