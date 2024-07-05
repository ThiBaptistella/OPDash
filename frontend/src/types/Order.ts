// src/types/Order.ts
import { Product } from "./Product";

export interface Order {
  _id?: string;
  products: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  supplier: string; // Make sure the supplier is a string
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: Date;
  totalAmount: number;
}
