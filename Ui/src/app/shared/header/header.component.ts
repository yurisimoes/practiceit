import { Component, HostListener } from '@angular/core';
import { GamesRepository } from "../../games/games.repository";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSideNav: boolean = false;
  isOpenDropdown = false;
  totalOfGamesToPlay$ = this.gamesRepo.totalOfGamesToPlay$

  constructor(public gamesRepo: GamesRepository) {
  }

  toggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const dropdownButton = document.getElementById('dropdown-button');

    if (dropdownButton && !dropdownButton.contains(clickedElement)) {
      this.isOpenDropdown = false;
    }
  }

  toggleSideNav(): void {
    this.showSideNav = !this.showSideNav;
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
