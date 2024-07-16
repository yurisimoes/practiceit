import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged, startWith, Subject,
  switchMap, take, takeUntil,
  tap,
} from 'rxjs';
import { DecksRepository } from './decks.repository';
import { Router } from '@angular/router';
import { LoginRepository } from '../shared/services/login.repository';

@Component({
  selector: 'app-list-of-decks',
  templateUrl: './list-of-decks.component.html',
  styleUrls: ['./list-of-decks.component.scss'],
})
export class ListOfDecksComponent implements OnInit, AfterViewInit, OnDestroy {
  decks$ = this.repo.decks$;
  searchControl = new FormControl();
  currentPage$ = new BehaviorSubject(1);
  loadingDecks = false;
  @ViewChild('anchor') anchor!: ElementRef<HTMLElement>;
  private observer!: IntersectionObserver;

  constructor(
    private repo: DecksRepository,
    private router: Router,
    private loginRepository: LoginRepository
  ) {
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
          return this.repo.get({search, page}, '/api/decks?');
        })
      )
      .subscribe((_) => (this.loadingDecks = false));
  }

  nextPage() {
    if (this.repo.hasPage(this.repo.currentPage) && !this.repo.isLast)
      this.currentPage$.next(this.currentPage$.value + 1);
  }

  originalUserDecks(userId: number) {
    this.loginRepository.userId$.pipe(take(1), tap((x) => {
      if (x === userId) {
        this.router.navigateByUrl('personal-decks')
      } else {
        this.router.navigateByUrl(`/other-user-decks/${userId}`)
      }
    })).subscribe()
  }
}
