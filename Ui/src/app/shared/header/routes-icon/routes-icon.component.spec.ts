import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesIconComponent } from './routes-icon.component';

describe('RoutesIconComponent', () => {
  let component: RoutesIconComponent;
  let fixture: ComponentFixture<RoutesIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesIconComponent]
    });
    fixture = TestBed.createComponent(RoutesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
