export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  imageUrl?: string;
}

export interface ProductsQueryData {
  products: Product[];
}
