// src/components/Cart.tsx

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Product } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartProps {
  cartItems: {
    product: Product;
    quantity: number;
    selectedVariants: any;
  }[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  return (
    <Box>
      <Typography variant="h6">Shopping Cart</Typography>
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={item.product.productName}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {Object.entries(item.selectedVariants)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${(item.product.retailPrice ?? 0).toFixed(2)}
                  </Typography>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(index, Number(e.target.value))
                    }
                    inputProps={{ min: 1 }}
                    margin="dense"
                    sx={{ width: "60px" }}
                  />
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => onRemoveItem(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="h6">
          Total: $
          {cartItems
            .reduce(
              (total, item) =>
                total + (item.product.retailPrice ?? 0) * item.quantity,
              0
            )
            .toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={onCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
