import { IUser } from "../../models/User";

declare namespace Express {
  interface Request {
    user: {
      id: string;
    };
  }
}
