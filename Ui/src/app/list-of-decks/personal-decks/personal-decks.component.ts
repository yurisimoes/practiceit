import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DecksRepository } from '../decks.repository';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { ListsOfDecksService } from '../lists-of-decks.service';
import { GamesRepository } from '../../games/games.repository';

@Component({
  selector: 'app-personal-decks',
  templateUrl: './personal-decks.component.html',
  styleUrls: ['./personal-decks.component.scss']
})
export class PersonalDecksComponent implements OnInit, AfterViewInit, OnDestroy {
  decks$ = this.repo.decks$;
  searchControl = new FormControl();
  currentPage$ = new BehaviorSubject(1);
  loadingDecks = false;
  @ViewChild('anchor') anchor!: ElementRef<HTMLElement>;
  private observer!: IntersectionObserver;
  @ViewChild('dialogContainer', {read: ViewContainerRef}) dialogContainer?: ViewContainerRef;

  constructor(
    private repo: DecksRepository,
    private decksService: ListsOfDecksService,
    private gamesRepo: GamesRepository) {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && this.nextPage();
      },
      {root: null}
    );
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
    this.repo.clearCache();
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnInit(): void {
    combineLatest([
      this.currentPage$,
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        tap(() => {
          this.loadingDecks = true;
          this.currentPage$.next(1);
          this.repo.clearCache();
        })
      ),
    ])
      .pipe(
        switchMap(([page, search]) => {
          //TODO: at some point this is gonna work, just don't know when
          // if (search == '') {
          //   this.loadingDecks = false
          //   return [];
          // }
          return this.repo.get({search, page}, '/api/decks/personal-decks?');
        })
      )
      .subscribe((_) => (this.loadingDecks = false));
  }

  openDialog(item: any) {
    const componentRef = this.dialogContainer!.createComponent(DeleteDialogComponent);
    componentRef.instance.deck = item;
    componentRef.instance.confirm.subscribe((itemData) => {
      if (itemData) {
        this.deleteDeck(itemData.id, componentRef)
      } else {
        componentRef.destroy();
      }
    });
  }

  deleteDeck(deckId: number, componentRef: ComponentRef<DeleteDialogComponent>) {
    this.decksService
      .deleteDeck(deckId)
      .pipe(
        tap({
          complete: () => {
            componentRef.destroy();
            this.gamesRepo.deleteGame(deckId);
            this.repo.deleteDeck(deckId);
          },
        })
      )
      .subscribe();
  }

  nextPage() {
    if (this.repo.hasPage(this.repo.currentPage) && !this.repo.isLast)
      this.currentPage$.next(this.currentPage$.value + 1);
  }
}
