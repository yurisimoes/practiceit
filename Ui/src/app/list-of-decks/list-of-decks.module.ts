import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ListOfDecksComponent } from './list-of-decks.component';
import { DeckComponent } from './deck/deck.component';
import { SharedModule } from '../shared/shared.module';
import { PersonalDecksComponent } from './personal-decks/personal-decks.component';
import { OtherUserDeckComponent } from './other-user-deck/other-user-deck.component';

const routes: Routes = [
  { path: '', component: ListOfDecksComponent },
  { path: ':id/edit', loadChildren: () => import('../cards/cards.module').then((m) => m.CardsModule) },
  { path: 'games', loadChildren: () => import('../games/games.module').then((m) => m.GamesModule) },
  { path: 'personal-decks', component: PersonalDecksComponent },
  { path: 'other-user-decks/:id', component: OtherUserDeckComponent },
];


@NgModule({
  declarations: [ListOfDecksComponent, DeckComponent, PersonalDecksComponent, OtherUserDeckComponent],
  exports: [ListOfDecksComponent, DeckComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class ListOfDecksModule {}
