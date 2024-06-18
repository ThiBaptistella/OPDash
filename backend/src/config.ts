import dotenv from "dotenv";

dotenv.config();

export const config = {
  clientId: process.env.XERO_CLIENT_ID as string,
  clientSecret: process.env.XERO_CLIENT_SECRET as string,
  redirectUri: process.env.XERO_REDIRECT_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
};
