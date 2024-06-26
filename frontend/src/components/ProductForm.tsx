// src/components/ProductForm.tsx
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Product } from "../types/Product";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialData: Product | null;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    borderRadius: 0,
    maxWidth: "450px",
    maxHeight: "100%",
  },
}));

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [product, setProduct] = useState<Product>({
    productName: "",
    type: "",
    brand: "",
    supplier: "",
    handle: "",
    supplierCode: "",
    averageCost: 0,
    supplyPrice: 0,
    sku: "",
    retailPrice: 0,
    inventory: 0,
    description: "",
    createdAt: new Date(),
  });

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    } else {
      setProduct({
        productName: "",
        type: "",
        brand: "",
        supplier: "",
        handle: "",
        supplierCode: "",
        averageCost: 0,
        supplyPrice: 0,
        sku: "",
        retailPrice: 0,
        inventory: 0,
        description: "",
        createdAt: new Date(),
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(product);
  };

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
      <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Type"
              name="type"
              value={product.type}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Supplier"
              name="supplier"
              value={product.supplier}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Handle"
              name="handle"
              value={product.handle}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Supplier Code"
              name="supplierCode"
              value={product.supplierCode}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Average Cost"
              name="averageCost"
              type="number"
              value={product.averageCost}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Supply Price"
              name="supplyPrice"
              type="number"
              value={product.supplyPrice}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="SKU"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={product.retailPrice}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Inventory"
              name="inventory"
              type="number"
              value={product.inventory}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ProductForm;
