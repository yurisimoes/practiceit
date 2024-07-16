import { Component, HostListener } from '@angular/core';
import { GamesRepository } from "../../games/games.repository";
import { concat, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { LoginService } from '../services/login.service';
import { LoginRepository } from '../services/login.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSideNav = false;
  isOpenDropdown = false;
  loggedUser$ = this.loginRepo.login$;
  isAuthenticated$ = this.loginRepo.isAuthenticated$;
  totalOfGamesToPlay$ = this.gamesRepo.totalOfGamesToPlay$

  constructor(
    public gamesRepo: GamesRepository,
    private authService: SocialAuthService,
    private loginService: LoginService,
    private loginRepo: LoginRepository,
    private router: Router) {
    this.totalOfGamesToPlay$
      .pipe(
        takeUntilDestroyed(),
        filter((g) => g === 0),
        tap(() => {
          this.showSideNav = false
        })).subscribe();
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

  login() {
    this.authService.authState.pipe(
      switchMap((x) => {
        return concat(this.loginService.login(x.idToken), this.loginService.loggedUser())
      })
    ).subscribe();
  }

  logout() {
    // TODO: LIB NO WORKING;
    // this.authService.signOut(true);
    this.loginService.logout().pipe(switchMap(() => {
      return this.loginService.loggedUser()
    })).subscribe(_ => this.router.navigateByUrl('/lists-of-decks').then(_ => location.reload()))
  }
}
