import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-routes-dropdown',
  templateUrl: './routes-dropdown.component.html',
  styleUrls: ['./routes-dropdown.component.scss']
})
export class RoutesDropdownComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  createNewCardDeck() {
    this.router.navigateByUrl('/create-cards-deck').then(() => this.isOpen = false);
  }

  personalDecks() {
    this.router.navigateByUrl('/personal-decks').then(() => this.isOpen = false);
  }
}
