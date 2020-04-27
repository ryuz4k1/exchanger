import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient,
  ) { }


  
  url(url, access_token, refresh_token) {  // <--- Notice that the parameter name became term instead of terms
    return of(url).pipe(
       debounceTime(500),
       distinctUntilChanged(),
       tap(_ => (this.loading$.next(true))),
       switchMap(() => {
         return this.http.post<any>(`${environment.api}/auth/url`, { url: url , accessToken: access_token, refreshToken: refresh_token});
       }),
       tap(_ => (this.loading$.next(false))),
  )}
  
}
