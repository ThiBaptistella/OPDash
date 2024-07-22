import { Request, Response } from "express";
import UserApp from "../models/UserApp";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  console.log("Register endpoint hit");
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userExists = await UserApp.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new UserApp({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("Login endpoint hit");
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserApp.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
