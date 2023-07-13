import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListOfDecksModule } from '../../list-of-decks/list-of-decks.module';
import { HeaderComponent } from './header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RoutesDropdownComponent } from './routes-dropdown/routes-dropdown.component';
import { RoutesIconComponent } from './routes-icon/routes-icon.component';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, RoutesDropdownComponent, RoutesIconComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    RouterLink,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ListOfDecksModule,
  ],
})
export class HeaderModule {}
