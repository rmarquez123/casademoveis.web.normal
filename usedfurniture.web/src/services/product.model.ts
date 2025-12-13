export interface Product {
  id: number;
  name: string;
  description?: string;
  available: boolean;
  dateReceived: Date;
  dateSold?: Date;
  category: number;
  pictures?: string[];
  categoryName: string;
  length?: number;
  depth?: number;
  height?: number;
  price?: number;
}

export interface Photo {
  photoId: number;
  src: string;
}

export interface Category {
  id: number;
  name: string;
}
