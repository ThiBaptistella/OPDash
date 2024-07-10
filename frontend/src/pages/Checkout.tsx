import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Product } from "../types";

interface CheckoutProps {
  cartItems: {
    product: Product;
    quantity: number;
    selectedVariants: any;
  }[];
  onPlaceOrder: (address: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder }) => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    onPlaceOrder(address);
    navigate("/dashboard/orders");
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Breadcrumb
        title="Checkout"
        paths={[
          { name: "Dashboard", link: "/dashboard/orders" },
          { name: "Orders" },
        ]}
      />
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6">Delivery Address</Typography>
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={3}>
          <Typography variant="h6">Order Summary</Typography>
          <Grid container spacing={2}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="body1">
                  {item.product.productName} (x{item.quantity})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {Object.entries(item.selectedVariants)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  $
                  {((item.product.retailPrice ?? 0) * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="h6">
              Total: $
              {cartItems.reduce(
                (total, item) =>
                  total + (item.product.retailPrice || 0) * item.quantity,
                0
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
