import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly http: HttpClient,
  ) { }


  public login(username) {
    console.log(username)
    return this.http.post<any>(`${environment.api}/auth/login`, { username: username})
  }
}
