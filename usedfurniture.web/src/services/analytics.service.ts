import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { catchError, filter, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  private apiUrl = environment.apiUrl.replace(/\/$/, '');

  constructor(private http: HttpClient, private router: Router) {}

  startTracking(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(event => {
        const body = new HttpParams().set('page', event.urlAfterRedirects);

        this.http.post(`${this.apiUrl}/api/track`, body.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .pipe(
          catchError(err => {
            console.warn('Analytics track failed', err);
            return of(null);
          })
        )
        .subscribe();
      });
  }
}
