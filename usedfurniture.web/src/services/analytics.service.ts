
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    
  private apiUrl = environment.apiUrl;

  /**
   * 
   * @param http 
   * @param router 
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * 
   */
  startTracking() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const params = new HttpParams().set('page', event.urlAfterRedirects);

        this.http.post(`${this.apiUrl}/api/track`, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).subscribe();
      }
    });
  }
}
