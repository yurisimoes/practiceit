import { Component, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
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
  selectedCardIndex: number | null = null;
  isCollapsed = true;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      if (this.selectedCardIndex === null || this.selectedCardIndex === this.deck.cards.length - 1) {
        this.selectCard(0);
      } else {
        this.selectCard(this.selectedCardIndex + 1);
      }
      event.preventDefault();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.deck) {
      this.deck.cards.forEach((card, index) => {
        const controlId = `control-${index}`;
        this.valueControls[controlId] = new FormControl('');
      });
    }
  }

  isInputCorrect(value: string, index: number) {
    const cardAtIndex = this.deck.cards[index];
    return (
      value.trim().length === cardAtIndex.value.trim().length && value.trim().toLowerCase() === cardAtIndex.value.trim().toLowerCase()
    );
  }

  selectCard(index: number, event?: Event): void {
    this.selectedCardIndex = index;
    const inputElement = this.el.nativeElement.querySelector(`#control-${index}`);
    inputElement.focus();
    if (event) {
      event.stopPropagation();
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
