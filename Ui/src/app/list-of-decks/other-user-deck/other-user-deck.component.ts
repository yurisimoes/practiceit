import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { DecksRepository } from '../decks.repository';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-user-deck',
  templateUrl: './other-user-deck.component.html',
  styleUrls: ['./other-user-deck.component.scss']
})
export class OtherUserDeckComponent implements OnInit, AfterViewInit, OnDestroy {
  id!: number;
  decks$ = this.repo.decks$;
  searchControl = new FormControl();
  currentPage$ = new BehaviorSubject(1);
  loadingDecks = false;
  @ViewChild('anchor') anchor!: ElementRef<HTMLElement>;
  private observer!: IntersectionObserver;

  constructor(private repo: DecksRepository, private activatedRoute: ActivatedRoute) {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && this.nextPage();
      },
      { root: null }
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
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
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
        switchMap(([page,search]) => {
          //TODO: at some point this is gonna work, just don't know when
          // if (search == '') {
          //   this.loadingDecks = false
          //   return [];
          // }
          var userId = this.id;
          return this.repo.get({ userId, search, page }, '/api/decks/other-user-deck?');
        })
      )
      .subscribe((_) => (this.loadingDecks = false));
  }

  nextPage() {
    if (this.repo.hasPage(this.repo.currentPage) && !this.repo.isLast)
      this.currentPage$.next(this.currentPage$.value + 1);
  }
}
