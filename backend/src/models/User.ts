import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  xeroTokens?: any; // Add this line to store Xero tokens
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  xeroTokens: { type: Object }, // Add this line to store Xero tokens
});

const User = model<IUser>("User", UserSchema);
export default User;
