import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDecksComponent } from './personal-decks.component';

describe('PersonalDecksComponent', () => {
  let component: PersonalDecksComponent;
  let fixture: ComponentFixture<PersonalDecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalDecksComponent]
    });
    fixture = TestBed.createComponent(PersonalDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
