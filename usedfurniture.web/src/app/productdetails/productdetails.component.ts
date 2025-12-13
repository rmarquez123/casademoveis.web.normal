import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Product } from '../../services/product.model';
import { FurnitureService } from '../../services/furniture.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  imports: [CommonModule]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  productPhotos: string[] = [];
  currentPhotoIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private furnitureService: FurnitureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!productId) {
      this.router.navigate(['/']);
      return;
    }

    this.furnitureService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === productId) ?? null;

      if (!this.product) {
        this.router.navigate(['/']);
        return;
      }

      this.furnitureService.getPhotosForProduct(this.product.id).subscribe({
        next: (photos) => {
          this.productPhotos = (photos ?? [])
            .filter(ph => ph?.src)
            .map(ph => `data:image/jpeg;base64,${ph.src}`);

          this.currentPhotoIndex = 0;
        },
        error: (err) => {
          console.error('Error loading photos for product', this.product?.id, err);
          this.productPhotos = [];
          this.currentPhotoIndex = 0;
        }
      });
    });
  }

  nextPhoto(): void {
    const n = this.productPhotos.length;
    if (n > 1) this.currentPhotoIndex = (this.currentPhotoIndex + 1) % n;
  }

  prevPhoto(): void {
    const n = this.productPhotos.length;
    if (n > 1) this.currentPhotoIndex = (this.currentPhotoIndex - 1 + n) % n;
  }

  selectPhoto(index: number): void {
    if (index >= 0 && index < this.productPhotos.length) {
      this.currentPhotoIndex = index;
    }
  }

  askAbout(): void {
    if (!this.product) return;

    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${this.product.name}\nVeja aqui: ${window.location.href}`
    );

    window.open(
      `https://api.whatsapp.com/send?phone=+5511916255803&text=${message}`,
      '_blank'
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
