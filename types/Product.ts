export interface Product {
  id: number | string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  brand?: string;
  stock?: number;
  rating?: number;
  discount?: number;
  mrp?: number;
  isFlashDeal?: boolean;
  imageUrl?: string;
  images?: string[];
}

