// furniture.service.ts

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Photo, Product } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private apiUrl = environment.apiUrl;
  
  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) {  
  }
  

  /**
   * 
   * @param category 
   * @returns 
   */
  getProductsByCategory(category: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('category', category);
    return this.http.get<any[]>(`${this.apiUrl}/products/byCategory`, {params}).pipe(
      map((data: any[]) => {

        return data.map(item => {
          return {
            id: item.product_id,
            name: item.name,
            description: item.description,
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
          } as Product;
        });
      }) 
    );
  }
  /**
   * 
   * @returns 
   */
  getProducts(): Observable<Product[]> {
    const self = this;
    return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
      map((data: any[]) => {
        return data.map(item => {
          return {
            id: item.product_id,
            name: item.name,
            description: item.description,
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
          } as Product;
        });
      })
    );
  }

  /**
   * 
   * @param productId 
   * @returns 
   */
  getPhotosForProduct(productId: number, width?: number, height?:number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/photos/product`, {
      params: { productId: productId.toString(), 
        ...(width !== undefined && { width: width.toString() }),
        ...(height !== undefined && { height: height.toString() })
      },
    });
  }


  /**
   * 
   * @param productId 
   * @returns 
   */
  getSinglePhotoForProduct(productId: number, width?: number, height?: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photos/product/single`, {
      params: {
        productId: productId.toString(),
        ...(width !== undefined && { width: width.toString() }),
        ...(height !== undefined && { height: height.toString() })
      },
    });
  }}
