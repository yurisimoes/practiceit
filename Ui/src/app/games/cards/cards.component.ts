import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeckOfCards } from '../../cards/cards.repository';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnChanges {
  @Input() deck!: DeckOfCards;
  valueControls: { [key: string]: FormControl } = {};

  ngOnChanges(changes: SimpleChanges) {
    if (this.deck) {
      this.deck.cards.forEach((card, index) => {
        const controlId = `control-${index}`;
        this.valueControls[controlId] = new FormControl('');
      });
    }
  }

  isInputCorrect(value: string, card: string, index: number) {
    const cardAtIndex = this.deck.cards[index];
    return (
      value.length === cardAtIndex.value.length && value.toLowerCase() === cardAtIndex.value.toLowerCase()
    );
  }
}
