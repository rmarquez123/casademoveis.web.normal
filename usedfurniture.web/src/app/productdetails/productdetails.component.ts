// src\app\productdetails\productdetails.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../services/product.model';
import { FurnitureService } from '../../services/furniture.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-product-details',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.css'],
    imports: [CommonModule]
})
export class ProductDetailsComponent implements OnInit {
    product: Product | null = null;
    
    // Store the Base64 data URLs for all photos
    productPhotos: string[] = [];
    // Index of the currently displayed photo
    currentPhotoIndex: number = 0;
    
    constructor(
        private route: ActivatedRoute,
        private furnitureService: FurnitureService, 
        private router: Router
    ) { }
    ngOnInit(): void {
      const productId = Number(this.route.snapshot.paramMap.get('id'));
  
      this.furnitureService.getProducts().subscribe((products) => {
        this.product = products.find(p => p.id === productId) ?? null;
        if (this.product) {
          // Fetch *all* photos for this product
          this.furnitureService.getPhotosForProduct(this.product.id)
            .subscribe(photos => {
              // Convert each photo's Base64 to a data URL
              this.productPhotos = photos.map(photo => 'data:image/jpeg;base64,' + photo.src);
              // Optionally reset currentPhotoIndex if needed
              this.currentPhotoIndex = 0;
            });
        }
      });
    }
  
    /** Show the next photo in the array (wrap around if needed). */
    nextPhoto(): void {
      if (this.productPhotos.length > 0) {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.productPhotos.length;
      }
    }
  
    /** Show the previous photo in the array (wrap around if needed). */
    prevPhoto(): void {
      if (this.productPhotos.length > 0) {
        this.currentPhotoIndex = 
          (this.currentPhotoIndex - 1 + this.productPhotos.length) % this.productPhotos.length;
      }
    }
  
    /** Jump to a specific photo based on thumbnail click. */
    selectPhoto(index: number): void {
      this.currentPhotoIndex = index;
    }
  
    askAbout(): void {
      window.open(
        'https://api.whatsapp.com/send?phone=+5511970760004&text=Olá%20Casa%20De%20Móveis%20Usados',
        '_blank'
      );
    }

    goBack() {
        // Instead of opening the modal:
        this.router.navigate(['/']);
      }
  }
  