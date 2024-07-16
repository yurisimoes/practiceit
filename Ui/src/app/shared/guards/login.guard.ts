import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginRepository } from '../services/login.repository';
import { first, map, tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(LoginRepository).isAuthenticated$.pipe(first(), map(x => {
    return x ? true : inject(Router).parseUrl('/')
  }))
};
