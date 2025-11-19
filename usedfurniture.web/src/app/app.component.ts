// app.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router'; // Import Router and NavigationEnd
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule] // Add CommonModule here
})
export class AppComponent implements OnInit {

  menuOpen = false;

  constructor(private router: Router, private analyticsService: AnalyticsService) {} // Inject Router

  ngOnInit() {
    // Listen for navigation events and close the menu on route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuOpen = false;
      }
    });
    this.analyticsService.startTracking();
  }

  toggleMenu() {
    console.log("Toggle menu called");
    this.menuOpen = !this.menuOpen;
  }

  goHome() {
    this.router.navigate(['/']); // Use router to navigate
  }
}
