import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CardComponent } from './card/card.component';
import { CreateEditComponent } from "./create-edit/create-edit.component";

const routes: Routes = [
  { path: '', component: CreateEditComponent },
  { path: 'create-cards-deck', component: CreateEditComponent },
  { path: ':id/edit', component: CreateEditComponent }
];

@NgModule({
  declarations: [CardComponent, CreateEditComponent],
  exports: [CreateEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class CardsModule {}
