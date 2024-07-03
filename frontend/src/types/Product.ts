export interface Product {
  _id?: any;
  productName?: string;
  productCategory?: string;
  productVariantOne?: string;
  productVariantOneValue?: string;
  productVariantTwo?: string;
  productVariantTwoValue?: string;
  productVariantThree?: string;
  productVariantThreeValue?: string;
  supplyPrice?: number;
  retailPrice?: number;
  brand?: string;
  supplier?: string;
  supplierCode?: string;
  active?: boolean;
  handle?: string;
  averageCost?: number;
  description?: string;
  sku?: string;
  inventory?: number;
  createdAt?: Date;
}
