import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(idToken: string) {
    return this.http.post<string>('/api/auth', {idToken});
  }
}
