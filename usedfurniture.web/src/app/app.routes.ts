import { Routes } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: '**', redirectTo: '' } // fallback
];
