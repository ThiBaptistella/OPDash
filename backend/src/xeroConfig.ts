import { Request, Response } from "express";
import { XeroClient } from "xero-node";
import { config } from "./config";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "./models/User";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

export const xero = new XeroClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUris: [config.redirectUri],
  scopes: [
    "openid",
    "profile",
    "email",
    "accounting.transactions",
    "accounting.settings",
    "offline_access",
    "accounting.reports.read",
  ],
});

export const authenticateXero = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const state = jwt.sign({ user: { id: userId } }, config.jwtSecret, {
    expiresIn: "1000m",
  }); // Token valid for 10 minutes

  const consentUrl = `https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=openid profile email accounting.transactions accounting.settings offline_access accounting.reports.read&state=${state}`;

  res.json({ consentUrl });
};

export const handleCallback = async (req: CustomRequest, res: Response) => {
  try {
    const { code, state } = req.query;
    const decoded = jwt.verify(state as string, config.jwtSecret) as {
      user: { id: string };
    };
    const userId = decoded.user.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const tokenResponse = await axios.post(
      "https://identity.xero.com/connect/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: config.redirectUri,
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${config.clientId}:${config.clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, id_token, expires_in } =
      tokenResponse.data;

    user.xeroTokens = { access_token, refresh_token, id_token, expires_in };
    await user.save();

    res.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Error during authentication callback:", error);
    res.status(500).send("Error during authentication callback");
    // Only send an error response if the headers have not already been sent
    if (!res.headersSent) {
      res.status(500).send("Error during authentication callback");
    }
  }
};
