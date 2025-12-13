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

  constructor(private http: HttpClient) {}

  getProductsByCategory(category: number): Observable<Product[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<ApiProduct[]>(`${this.apiUrl}/products/byCategory`, { params }).pipe(
      map(data => data.map(this.mapProduct))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiProduct[]>(`${this.apiUrl}/products`).pipe(
      map(data => data.map(this.mapProduct))
    );
  }

  getPhotosForProduct(productId: number, width?: number, height?: number): Observable<Photo[]> {
    const params: any = { productId: productId.toString() };
    if (width != null) params.width = width.toString();
    if (height != null) params.height = height.toString();

    return this.http.get<Photo[]>(`${this.apiUrl}/photos/product`, { params });
  }

  getSinglePhotoForProduct(productId: number, width?: number, height?: number): Observable<Photo> {
    const params: any = { productId: productId.toString() };
    if (width != null) params.width = width.toString();
    if (height != null) params.height = height.toString();

    return this.http.get<Photo>(`${this.apiUrl}/photos/product/single`, { params });
  }

  private mapProduct(item: ApiProduct): Product {
    return {
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
  }
}
