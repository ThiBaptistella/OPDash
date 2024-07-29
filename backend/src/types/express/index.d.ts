import { IUser } from "../../models/Vendor";

declare namespace Express {
  interface Request {
    user: {
      id: string;
    };
  }
}
