// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Integrations from "./pages/Integrations";
import Invoices from "./pages/InvoicesPage";
import responsiveTheme from "./utils/theme";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import OrderForm from "./components/OrderForm";
import OrderPage from "./pages/OrderPage";
import OrderDetails from "./pages/OrderDetails";
import Sales from "./pages/Sales";
import LoyaltyProgramList from "./components/LoyaltyProgramList";
import Scan from "./pages/Scan";
import LoyaltyProgramDetails from "./components/LoyaltyProgramDetails";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/scan" element={<Scan />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="sales" element={<Sales />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="orders/new" element={<OrderForm />} />
            <Route path="orders/edit/:id" element={<OrderForm />} />
            <Route path="orders/details/:id" element={<OrderDetails />} />
            <Route
              path="marketing/loyaltyPrograms/:id"
              element={<LoyaltyProgramDetails />}
            />
            <Route
              path="marketing/loyaltyPrograms"
              element={<LoyaltyProgramList />}
            />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
