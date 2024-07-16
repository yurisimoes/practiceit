import { Component, EventEmitter, Output } from '@angular/core';
import { Deck } from '../../list-of-decks/decks.repository';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  @Output() confirm = new EventEmitter<any>();
  deck!: Deck;

  onConfirm() {
    this.confirm.emit(this.deck);
  }

  onCancel() {
    this.confirm.emit(null);
  }
}
