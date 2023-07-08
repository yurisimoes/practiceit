import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDecksComponent } from './list-of-decks.component';

describe('ListOfDecksComponent', () => {
  let component: ListOfDecksComponent;
  let fixture: ComponentFixture<ListOfDecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfDecksComponent]
    });
    fixture = TestBed.createComponent(ListOfDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
