import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'games', component: GamesComponent },
];
@NgModule({
  declarations: [GamesComponent, CardsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class GamesModule {}
