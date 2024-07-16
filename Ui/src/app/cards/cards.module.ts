import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CardComponent } from './card/card.component';
import { CreateEditComponent } from "./create-edit/create-edit.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { loginGuard } from '../shared/guards/login.guard';

const routes: Routes = [
  { path: '', component: CreateEditComponent, canActivate: [loginGuard] },
  { path: 'create-cards-deck', component: CreateEditComponent, canActivate: [loginGuard] },
  { path: ':id/edit', component: CreateEditComponent, canActivate: [loginGuard] }
];

@NgModule({
  declarations: [CardComponent, CreateEditComponent],
  exports: [CreateEditComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        FontAwesomeModule
    ],
})
export class CardsModule {}
