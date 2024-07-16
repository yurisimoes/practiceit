import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfDecksComponent } from './list-of-decks/list-of-decks.component';
import { loginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lists-of-decks',
  },
  {
    path: 'lists-of-decks',
    loadChildren: () =>
      import('./list-of-decks/list-of-decks.module').then(
        (m) => m.ListOfDecksModule
      ),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'create-cards-deck',
    loadChildren: () =>
      import('./cards/cards.module').then((m) => m.CardsModule),
    canActivate: [loginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
