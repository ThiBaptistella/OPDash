import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import authRoutes from "./routes/auth";
import xeroRoutes from "./routes/xeroRoutes";
import reportRoutes from "./routes/reportRoutes";
import invoiceRoutes from "./routes/invoicesRoutes";
import eodRoutes from "./routes/eodRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import salesRoutes from "./routes/saleRoutes";
import loyaltyProgramRoutes from "./routes/loyaltyProgramRoutes";
import tierBasedProgramRoutes from "./routes/tierBasedProgramRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import userAppRoutes from "./routes/userAppRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/xero", xeroRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/eod", eodRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/loyaltyPrograms", loyaltyProgramRoutes);
app.use("/api/tierBasedPrograms", tierBasedProgramRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
// only for the app
app.use("/api/users", userAppRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
