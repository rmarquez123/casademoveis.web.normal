import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule]
})
export class AppComponent implements OnInit {

  menuOpen = false;

  constructor(private router: Router, private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuOpen = false;
      }
    });
    this.analyticsService.startTracking();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
