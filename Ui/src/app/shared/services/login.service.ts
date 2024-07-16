import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRepository, User } from './login.repository';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private loginRepository: LoginRepository) { }

  login(idToken: string) {
    return this.http.post<string>('/api/auth/sign-in-google', {idToken});
  }

  logout() {
    return this.http.get('/api/auth/google-sign-out');
  }

  loggedUser(){
    return this.http.get<User>('/api/me').pipe(tap(this.loginRepository.setLogin));
  }
}
