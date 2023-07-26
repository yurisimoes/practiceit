import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardsForm!: FormGroup;
  @Input() showRemoveButton!: boolean;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
}
