import mongoose, { Document, Schema } from "mongoose";

export interface ISupplier extends Document {
  supplierName: string;
  defaultMarkup: number;
  description: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  mobile: string;
  fax: string;
  website: string;
  twitter: string;
  street: string;
  suburb: string;
  zipCode: string;
  state: string;
  country: string;
}

const SupplierSchema: Schema = new Schema({
  supplierName: { type: String, required: true },
  defaultMarkup: { type: Number, required: true, default: 0 },
  description: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  company: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  mobile: { type: String, required: false },
  fax: { type: String, required: false },
  website: { type: String, required: false },
  twitter: { type: String, required: false },
  street: { type: String, required: false },
  suburb: { type: String, required: false },
  zipCode: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
});

export default mongoose.model<ISupplier>("Supplier", SupplierSchema);
