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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Product } from "../types/Product";
import useSuppliers from "../hooks/useSuppliers";
import { SelectChangeEvent } from "@mui/material/Select";

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
    productCategory: "",
    productVariantOne: "",
    productVariantOneValue: "",
    productVariantTwo: "",
    productVariantTwoValue: "",
    productVariantThree: "",
    productVariantThreeValue: "",
    supplyPrice: 0,
    retailPrice: 0,
    brand: "",
    supplier: "",
    supplierCode: "",
    active: true,
    handle: "",
    averageCost: 0,
    description: "",
    sku: "",
    inventory: 0,
    createdAt: new Date(),
  });

  const { suppliers } = useSuppliers();

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    } else {
      setProduct({
        productName: "",
        productCategory: "",
        productVariantOne: "",
        productVariantOneValue: "",
        productVariantTwo: "",
        productVariantTwoValue: "",
        productVariantThree: "",
        productVariantThreeValue: "",
        supplyPrice: 0,
        retailPrice: 0,
        brand: "",
        supplier: "",
        supplierCode: "",
        active: true,
        handle: "",
        averageCost: 0,
        description: "",
        sku: "",
        inventory: 0,
        createdAt: new Date(),
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setProduct((prev) => ({ ...prev, [name as string]: value }));
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
              label="Category"
              name="productCategory"
              value={product.productCategory}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Variant One"
              name="productVariantOne"
              value={product.productVariantOne}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Variant One Value"
              name="productVariantOneValue"
              value={product.productVariantOneValue}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Variant Two"
              name="productVariantTwo"
              value={product.productVariantTwo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Variant Two Value"
              name="productVariantTwoValue"
              value={product.productVariantTwoValue}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Variant Three"
              name="productVariantThree"
              value={product.productVariantThree}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Variant Three Value"
              name="productVariantThreeValue"
              value={product.productVariantThreeValue}
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
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                label="Supplier"
                name="supplier"
                value={product.supplier as string}
                onChange={handleSelectChange}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier.supplierName}>
                    {supplier.supplierName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              name="retailPrice"
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={product.active}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      active: e.target.checked,
                    }))
                  }
                  name="active"
                />
              }
              label="Active"
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
