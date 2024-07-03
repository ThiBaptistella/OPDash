// src/types/Order.ts
import { Product } from "./Product";
import { Supplier } from "./Supplier";

export interface Order {
  _id?: string;
  supplier: Supplier;
  products: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: Date;
  totalAmount: number;
}
