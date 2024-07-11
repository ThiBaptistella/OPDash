import { Product } from "./Product";

// src/types.ts
export interface InventoryItem {
  id: string;
  sku: string;
  product: Product;
  tracked: boolean;
  stock: number;
}

export interface InventoryLevel {
  id: string;
  inventoryItem: InventoryItem;
  location: Location;
  quantity: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
}
