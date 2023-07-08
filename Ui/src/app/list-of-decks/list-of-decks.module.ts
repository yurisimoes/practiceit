import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ListOfDecksComponent } from './list-of-decks.component';
import { DeckComponent } from './deck/deck.component';

const routes: Routes = [
  { path: '', component: ListOfDecksComponent },
  { path: 'create', loadChildren: () => import('../cards/cards.module').then((m) => m.CardsModule) },
  { path: ':id/edit', loadChildren: () => import('../cards/cards.module').then((m) => m.CardsModule) },
  { path: 'games', loadChildren: () => import('../games/games.module').then((m) => m.GamesModule) }
];


@NgModule({
  declarations: [
    ListOfDecksComponent,
    DeckComponent
  ],
  exports: [
    ListOfDecksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ListOfDecksModule { }
