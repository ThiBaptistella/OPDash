// src/components/ProductDetailModal.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  styled,
  TextField,
  Grid,
} from "@mui/material";
import { Product } from "../types";

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onAddProduct: (product: Product, quantity: number) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    borderRadius: 0,
    maxWidth: "450px",
    minHeight: "100%",
  },
}));

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onClose,
  product,
  onAddProduct,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddProduct = () => {
    if (product) {
      onAddProduct(product, quantity);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      sx={{
        justifyContent: "flex-end",
        height: "100%",
        outline: "0px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{product.productName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {typeof product.supplier === "string"
                ? product.supplier
                : product.supplier?.supplierName || ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.retailPrice}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Brand:</strong> {product.brand}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Category:</strong> {product.productCategory}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Description:</strong> {product.description}
            </Typography>
            <Typography variant="subtitle1">
              <strong>SKU:</strong> {product.sku}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Inventory:</strong> {product.inventory}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Supply Price:</strong> ${product.supplyPrice}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Average Cost:</strong> ${product.averageCost}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Supplier Code:</strong> {product.supplierCode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              fullWidth
              margin="normal"
              inputProps={{ min: 1 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddProduct} variant="contained" color="primary">
          Add to Order
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ProductDetailModal;
