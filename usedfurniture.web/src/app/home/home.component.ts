import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '../../services/furniture.service';
import { Category, Product } from '../../services/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {

  items: Product[] = [];

  categories: Category[] = [
    { name: 'Cozinha', id: 0 },
    { name: 'Sala', id: 1 },
    { name: 'Quartos', id: 2 },
  ];

  selectedCategory: number | null = null;

  private photoCache = new Map<number, string>();

  constructor(
    private furnitureService: FurnitureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  private loadAllProducts(): void {
    this.furnitureService.getProducts().subscribe(products => {
      this.items = products;
      this.loadPhotosForAllProducts();
    });
  }

  toggleCategory(categoryId: number): void {
    if (this.selectedCategory === categoryId) {
      this.selectedCategory = null;
      this.loadAllProducts();
      return;
    }

    this.selectedCategory = categoryId;

    this.furnitureService.getProductsByCategory(categoryId).subscribe(products => {
      this.items = products;
      this.loadPhotosForAllProducts();
    });
  }

  private loadPhotosForAllProducts(): void {
    this.items.forEach(product => {
      const cachedUrl = this.photoCache.get(product.id);
      if (cachedUrl) {
        product.pictures = [cachedUrl];
        return;
      }

      this.furnitureService
        .getSinglePhotoForProduct(product.id, 600, 600)
        .subscribe({
          next: (photo) => {
            if (photo?.src) {
              const dataUrl = `data:image/jpeg;base64,${photo.src}`;
              this.photoCache.set(product.id, dataUrl);
              product.pictures = [dataUrl];
            } else {
              product.pictures = [];
            }
          },
          error: (err) => {
            console.error('Error loading photo for product', product.id, err);
            product.pictures = [];
          }
        });
    });
  }

  viewDetails(item: Product): void {
    this.router.navigate(['/products', item.id]);
  }

  askAbout(item?: Product): void {
    const name = item?.name ? ` do móvel: ${item.name}` : '';
    const message = encodeURIComponent(`Olá CasaMóveis! Tenho interesse${name}.`);

    window.open(
      `https://api.whatsapp.com/send?phone=+5511916255803&text=${message}`,
      '_blank'
    );
  }
}
