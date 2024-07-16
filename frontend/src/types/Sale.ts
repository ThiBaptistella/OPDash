import { Product } from "./Product";

export interface Sale {
  _id: string;
  product: Product;
  receiptNumber: number;
  customerName: string;
  quantity: number;
  subtotal: number;
  salesTax: number;
  total: number;
  details: string;
  saleDate: Date;
}
