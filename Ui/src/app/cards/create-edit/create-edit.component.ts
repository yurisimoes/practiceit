import { Location } from "@angular/common";
import { Component } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";
import { CardsRepository } from "../cards.repository";
import { CardsService } from "../cards.service";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent {
  id?: number;
  form: FormGroup;

  constructor(
    private cardsService: CardsService,
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cardsRepo: CardsRepository) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.cardsService.getById(this.id).pipe(takeUntilDestroyed()).subscribe((_) => {
        const deck = this.cardsRepo.deck$(this.id!);
        this.form.patchValue(deck!);
        deck!.cards.slice().forEach((x) => {
          this.cards.push(this.fb.group(x))
        })
      })
    }
    this.form = this.fb.group({
      title: [''],
      description: [''],
      cards: !this.id ? this.fb.array([this.createNewCard()]) : this.fb.array([])
    });
  }

  get cards(): FormArray {
    return this.form.get('cards') as FormArray;
  }

  getCardsControl(index: number): FormGroup {
    return this.cards.at(index) as FormGroup;
  }

  createNewCard() {
    return this.fb.group({
      key: [''],
      value: ['']
    });
  }

  addNewCard() {
    this.cards.push(this.createNewCard());
  }

  removeCard(index: number) {
    if (this.cards.length > 1) {
      this.cards.removeAt(index);
    }
  }

  save() {
    (!this.id ? this.cardsService.add(this.form.value) : this.cardsService.update(this.id, this.form.value))
      .pipe(finalize(() => {
        this.location.back()
      })).subscribe();
  }
}
