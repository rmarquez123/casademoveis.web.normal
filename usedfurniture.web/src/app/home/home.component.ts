// src\app\home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FurnitureService } from '../../services/furniture.service';
import { Category, Product } from '../../services/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]

})
export class HomeComponent implements OnInit {
  items: Product[] = [];
  selectedItem: any = null;
  isModalOpen: boolean = false;

  constructor(private furnitureService: FurnitureService, private router: Router) { }

  ngOnInit() {
    this.furnitureService.getProducts().subscribe(products => {
      this.items = products;
      this.loadPhotosForAllProducts();
    });
  }
  private photoCache: Map<number, string> = new Map<number, string>();

  private loadPhotosForAllProducts(): void {
    this.items.forEach((product) => {
  
      // 1. Check if the photo is already in the cache
      if (this.photoCache.has(product.id)) {
        // Use cached image
        const cachedUrl = this.photoCache.get(product.id);
        product.pictures = cachedUrl ? [cachedUrl] : [];
      } else {
        // 2. Otherwise, fetch from the backend
        this.furnitureService.getSinglePhotoForProduct(product.id, 250, 400).subscribe({
          next: (photo) => {
            if (photo && photo.src) {
              const dataUrl = 'data:image/jpeg;base64,' + photo.src;
              
              // Cache the result for future use
              this.photoCache.set(product.id, dataUrl);
              
              // Update the product’s pictures
              product.pictures = [dataUrl];
            }
          },
          error: (err) => {
            console.error('Error loading photo for product', product.id, err);
          }
        });
      }
    });
  }
  
  categories: Category[] = [
    { name: 'Cozinha', id: 0 },
    { name: 'Sala', id: 1 },
    { name: 'Quartos', id: 2 },
    // { name: 'Outras', id: -1 },
  ];


  filterByCategory(category: number) {
    this.furnitureService.getProductsByCategory(category).subscribe(products => {
      this.items = products;
    });

  }

  selectedCategory: number | null = null;

  toggleCategory(category: number) {
    if (this.selectedCategory === category) {
      // Deselect category and show all items
      this.selectedCategory = null;
      this.furnitureService.getProducts().subscribe(products => {
        this.items = products;
        this.loadPhotosForAllProducts();
      });
    } else {
      // Select category and filter items
      this.selectedCategory = category;
      this.furnitureService.getProductsByCategory(category).subscribe(products => {
        this.items = products;
        this.loadPhotosForAllProducts();
      });
    }
  }



  // Function to open the modal and display the selected item
  viewDetails(item: Product) {
    // Instead of opening the modal:
    this.router.navigate(['/products', item.id]);
  }


  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = null;
  }

  askAbout() {
    window.open(
      'https://api.whatsapp.com/send?phone=+5511916255803&text=Olá%20Casa%20De%20Móveis%20Usados',
      '_blank' // This specifies that the link should open in a new tab
    );
  }

}
