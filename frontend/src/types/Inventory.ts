import { Product } from "./Product";

// src/types.ts
export interface InventoryItem {
  _id: any;
  sku: string;
  product: Product;
  tracked: boolean;
  stock: number;
}

export interface InventoryLevel {
  _id: any;
  inventoryItem: InventoryItem;
  location: Location;
  quantity: number;
}

export interface Location {
  _id: any;
  name: string;
  address: string;
}
