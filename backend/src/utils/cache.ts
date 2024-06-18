import { createClient } from "redis";
import { promisify } from "util";
import { Request, Response, NextFunction } from "express";

// Create and configure Redis client
const client = createClient();

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.connect(); // Connect the client

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

export const cache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl || req.url;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }

  const originalJson = res.json.bind(res);

  // Override res.json method
  res.json = (body: any) => {
    setAsync(key, JSON.stringify(body), "EX", 60 * 15); // Cache for 15 minutes
    return originalJson(body);
  };

  next();
};
