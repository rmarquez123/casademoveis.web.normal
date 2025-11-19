// app.routes.ts

import { Routes } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';

export const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent },  // Default route
  { path: 'products/:id', component: ProductDetailsComponent },
];
