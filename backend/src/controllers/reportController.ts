import { Request, Response } from "express";
import { xero } from "../xeroConfig";
import User from "../models/Vendor";

const getTenantId = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user || !user.xeroTokens) {
    throw new Error("User not authenticated with Xero");
  }

  xero.setTokenSet(user.xeroTokens);

  if (xero.readTokenSet().expired()) {
    console.log("Token expired, refreshing token");
    const newTokenSet = await xero.refreshToken();
    user.xeroTokens = newTokenSet;
    await user.save();
  }

  // Ensure tenants are updated before accessing
  if (xero.tenants.length === 0) {
    console.log("Updating tenants...");
    await xero.updateTenants();
  }

  if (xero.tenants.length === 0) {
    throw new Error("No tenants found");
  }

  console.log("Tenant ID:", xero.tenants[0].tenantId);
  return xero.tenants[0].tenantId;
};

export const getBalanceSheet = async (req: Request, res: Response) => {
  try {
    const tenantId = await getTenantId((req as any).user!.id);
    const response = await xero.accountingApi.getReportBalanceSheet(tenantId);
    console.log("getBalanceSheet", response.body);
    res.json(response.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getBankSummary = async (req: Request, res: Response) => {
  try {
    const tenantId = await getTenantId((req as any).user!.id);
    const response = await xero.accountingApi.getReportBankSummary(tenantId);
    res.json(response.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getExecutiveSummary = async (req: Request, res: Response) => {
  try {
    const tenantId = await getTenantId((req as any).user!.id);
    const response = await xero.accountingApi.getReportExecutiveSummary(
      tenantId
    );
    res.json(response.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getProfitAndLoss = async (req: Request, res: Response) => {
  try {
    const tenantId = await getTenantId((req as any).user!.id);
    const response = await xero.accountingApi.getReportProfitAndLoss(tenantId);
    res.json(response.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getTrialBalance = async (req: Request, res: Response) => {
  try {
    const tenantId = await getTenantId((req as any).user!.id);
    const response = await xero.accountingApi.getReportTrialBalance(tenantId);
    res.json(response.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching trial balance:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
