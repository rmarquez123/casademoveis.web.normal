import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Photo, Product } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environments/environment";

type ApiProduct = {
  product_id: number;
  name: string;
  description?: string;
  available: boolean;
  dateReceived: number; // epoch seconds
  dateSold?: string | number;
  category: number;
  categoryName: string;
  length?: number;
  depth?: number;
  height?: number;
  price?: number;
};

@Injectable({ providedIn: 'root' })
export class FurnitureService {
  private apiUrl = environment.apiUrl.replace(/\/$/, '');

  constructor(private http: HttpClient) { }

  getProductsByCategory(category: number): Observable<Product[]> {
    /**
     * Get products by category.
     */
    const params = new HttpParams() //
      .set('category', category)
      .set("siteVisibleOnly", "true")
      ;

    const result = this.http.get<ApiProduct[]>(`${this.apiUrl}/products/byCategory`, { params })
      .pipe(map(this.mapProducts.bind(this)));
    return result;
  }

  getProducts(): Observable<Product[]> {
    /**
     * Get all products.
     */
    const params = new HttpParams().set("siteVisibleOnly", "true");
    const result = this.http.get<ApiProduct[]>(`${this.apiUrl}/products`, { params }).pipe(
      map(this.mapProducts.bind(this))
    );
    return result;
  }


  private mapProducts(data: ApiProduct[]): Product[] {
    /**
     * Map API products to Product model and shuffle the result.
     */
    const products = data.map(item => this.mapProduct(item));
    // Fisher-Yates shuffle
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;

  }




  getPhotosForProduct(productId: number, width?: number, height?: number): Observable<Photo[]> {
    /**
     * Get all photos for a product.
     */
    const params: any = { productId: productId.toString() };
    if (width != null) params.width = width.toString();
    if (height != null) params.height = height.toString();

    return this.http.get<Photo[]>(`${this.apiUrl}/photos/product`, { params });
  }

  getSinglePhotoForProduct(productId: number, width?: number, height?: number): Observable<Photo> {
    /**
     * Get a single photo for a product. If multiple photos exist, the first one is returned.
     */
    const params: any = { productId: productId.toString() };
    if (width != null) params.width = width.toString();
    if (height != null) params.height = height.toString();

    const result = this.http.get<Photo>(`${this.apiUrl}/photos/product/single`, { params });
    return result;
  }

  private mapProduct(item: ApiProduct): Product {
    const result = {
      id: item.product_id,
      name: item.name,
      description: item.description ?? '',
      available: item.available,
      dateReceived: new Date(item.dateReceived * 1000),
      dateSold: item.dateSold ? new Date(item.dateSold) : undefined,
      category: item.category,
      categoryName: item.categoryName,
      pictures: [],
      length: item.length,
      depth: item.depth,
      height: item.height,
      price: item.price
    };
    return result;
  }

}


