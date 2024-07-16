import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ListOfDecksComponent } from './list-of-decks.component';
import { DeckComponent } from './deck/deck.component';
import { SharedModule } from '../shared/shared.module';
import { PersonalDecksComponent } from './personal-decks/personal-decks.component';
import { OtherUserDeckComponent } from './other-user-deck/other-user-deck.component';
import { loginGuard } from '../shared/guards/login.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: ListOfDecksComponent },
  { path: ':id/edit', loadChildren: () => import('../cards/cards.module').then((m) => m.CardsModule), canActivate: [loginGuard] },
  { path: 'games', loadChildren: () => import('../games/games.module').then((m) => m.GamesModule) },
  { path: 'personal-decks', component: PersonalDecksComponent, canActivate: [loginGuard] },
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
    FontAwesomeModule,
  ],
})
export class ListOfDecksModule {}
