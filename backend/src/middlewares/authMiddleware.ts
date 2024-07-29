import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Vendor";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.error("No token provided");
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      user: { id: string };
    };

    const user = await User.findById(decoded.user.id);

    if (!user) {
      console.error("User not found");
      return res.status(401).send("Unauthorized");
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    console.error("Authentication Error:", error); // Log the error
    res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
