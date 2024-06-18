import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import authRoutes from "./routes/auth";
import xeroRoutes from "./routes/xeroRoutes";
import reportRoutes from "./routes/reportRoutes";
import invoiceRoutes from "./routes/invoicesRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/xero", xeroRoutes);
app.use("/api/reports", reportRoutes); // OR Reports, test later
app.use("/api/invoices", invoiceRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
