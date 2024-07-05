import { ISupplier } from "./Supplier";

export interface IProduct {
  productName: string;
  productCategory: string;
  productVariantOne: string;
  productVariantOneValue: string;
  productVariantTwo: string;
  productVariantTwoValue: string;
  productVariantThree: string;
  productVariantThreeValue: string;
  supplyPrice: number;
  retailPrice: number;
  brand: string;
  supplier: ISupplier | string;
  supplierCode: string;
  active: boolean;
  handle: string;
  averageCost: number;
  description: string;
  sku: string;
  inventory: number;
  createdAt: Date;
}
