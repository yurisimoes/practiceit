import { createStore, select, setProp, setProps, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

export interface User {
  id: number;
  role: string;
  name: string;
  isAuthenticated: boolean;
}

const store = createStore({ name: 'login' }, withProps<Partial<User>>({}));

@Injectable({ providedIn: 'root' })
export class LoginRepository {
  login$ = store.pipe(select(x => x));
  isAuthenticated$ = store.pipe(select(x => !!x.isAuthenticated));
  userId$ = store.pipe(select(x => x.id));

  setLogin(user: User) {
    store.update(setProps(user));
  }
}
