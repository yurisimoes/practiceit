import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from "@angular/router";
import { GamesRepository } from "../../../games/games.repository";
import { GamesService } from "../../../games/games.service";
import { filter, takeWhile } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({  transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      // TODO: check why this is not working
      // transition(':leave', [
      //   style({ transform: 'translateX(-100%)' }),
      //   animate('300ms ease-in-out', style({ opacity: 0, transform: 'translateX(0)' }))
      // ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 0.5 }))
      ]),
      // TODO: check why this is not working
      // transition(':leave', [
      //   style({ opacity: 0.5 }),
      //   animate('300ms ease-in-out', style({ opacity: 0 }))
      // ])
    ])
  ]
})
export class SideNavComponent {
  @Input() showSideNav = false;
  @Output() closeSideNavEvent = new EventEmitter<void>();
  games$ = this.gameRepo.gamesToPlay$;

  constructor(private gameRepo: GamesRepository, private gameService: GamesService, private router: Router) { }

  @HostListener('document:keydown.escape')
  closeSideNav(): void {
    this.closeSideNavEvent.emit();
  }

  animationDone(event: any): void {
    if (!this.showSideNav && event.toState === 'out') {
      // Reset the animation state when side nav is closed
      event.element.style.transform = 'translateX(-100%)';
    }
  }

  clearGames() {
    this.closeSideNav();
    this.gameService.clearSideNavGames();
  }

  playGames() {
    this.closeSideNav();
    this.router.navigateByUrl('/games')
  }
}
