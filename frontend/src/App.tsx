// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CustomerProfile from "./components/CustomerProfile";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
import Integrations from "./pages/Integrations";
import Invoices from "./pages/Invoices";
import responsiveTheme from "./utils/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="clients" element={<CustomerProfile />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="invoices" element={<Invoices />} />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
