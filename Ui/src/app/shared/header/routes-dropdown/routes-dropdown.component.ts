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
    this.isOpen = false;
    this.router.navigateByUrl('/create-cards-deck');
  }
}
