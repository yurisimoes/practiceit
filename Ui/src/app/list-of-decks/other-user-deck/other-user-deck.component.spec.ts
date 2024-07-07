import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserDeckComponent } from './other-user-deck.component';

describe('OtherUserDeckComponent', () => {
  let component: OtherUserDeckComponent;
  let fixture: ComponentFixture<OtherUserDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherUserDeckComponent]
    });
    fixture = TestBed.createComponent(OtherUserDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
