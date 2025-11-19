// src\services\product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  available: boolean;
  dateReceived: Date;
  dateSold?: Date;
  category: number; // since backend returns an int
  pictures?: string[];
  categoryName: string; // New property to store the category name
  length?: number;
  depth?: number;
  height?: number;
  price?: number;
}


export interface Photo {
  photoId : number, 
  src: string
}

export interface Category {
  id: number;
  name: string;
}