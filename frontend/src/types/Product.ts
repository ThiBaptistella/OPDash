export interface Product {
  description: unknown;
  _id?: any;
  productName: string;
  type: string;
  brand: string;
  supplier: string;
  handle: string;
  supplierCode: string;
  averageCost: number;
  supplyPrice: number;
  sku: string;
  retailPrice: number;
  inventory: number;
  createdAt: Date;
}
