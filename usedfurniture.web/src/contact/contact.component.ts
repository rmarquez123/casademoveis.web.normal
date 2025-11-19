// src\app\contact.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  // New function to handle any initialization logic for the Contact component
  ngOnInit(): void {
    // Currently, no initialization logic needed. 
    // Here you can load map configurations, if required in the future.
  }
}
