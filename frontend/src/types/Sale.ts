import { Product } from "./Product";

export interface Sale {
  _id: string;
  product: Product;
  receiptNumber: string;
  lineType: string;
  customerCode: string;
  customerName: string;
  note: string;
  quantity: number;
  subtotal: number;
  salesTax: number;
  discount: number;
  loyalty: number;
  total: number;
  paid: number;
  details: string;
  register: string;
  user: string;
  status: string;
  sku: string;
  accountCodeSale: string;
  accountCodePurchase: string;
  saleDate: Date;
}
