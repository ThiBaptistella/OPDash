// src/pages/OrderForm.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import useProducts from "../hooks/useProducts";
import useSuppliers from "../hooks/useSuppliers";
import { Order, Product, Supplier } from "../types";

const OrderForm: React.FC = () => {
  const { addOrder, updateOrder, orders } = useOrders();
  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const [order, setOrder] = useState<Order>({
    supplier: { supplierName: "", _id: "" },
    products: [],
    status: "Pending",
    orderDate: new Date(),
    totalAmount: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const orderToEdit = orders.find((order) => order._id === id);
      if (orderToEdit) {
        setOrder(orderToEdit);
        setIsEditing(true);
      }
    }
  }, [id, orders]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSupplierChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const supplierId = e.target.value as string;
    const supplier = suppliers.find((s) => s._id === supplierId);
    if (supplier) {
      setOrder({ ...order, supplier });
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      const updatedProducts = [...order.products];
      updatedProducts[index] = { ...updatedProducts[index], product };
      setOrder({ ...order, products: updatedProducts });
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...order.products];
    updatedProducts[index] = { ...updatedProducts[index], quantity };
    setOrder({ ...order, products: updatedProducts });
  };

  const handleAddProduct = () => {
    setOrder({
      ...order,
      products: [
        ...order.products,
        { product: { _id: "", productName: "" }, quantity: 1, price: 0 },
      ],
    });
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = order.products.filter((_, i) => i !== index);
    setOrder({ ...order, products: updatedProducts });
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await updateOrder(order._id!, order);
    } else {
      await addOrder(order);
    }
    navigate("/dashboard/orders");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {isEditing ? "Edit Order" : "New Order"}
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            select
            label="Supplier"
            value={order.supplier._id}
            onChange={handleSupplierChange}
            helperText="Please select a supplier"
            margin="normal"
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.supplierName}
              </MenuItem>
            ))}
          </TextField>
          <Grid container spacing={2}>
            {order.products.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    select
                    label="Product"
                    value={item.product._id}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    helperText="Please select a product"
                    margin="normal"
                  >
                    {products.map((product) => (
                      <MenuItem key={product._id} value={product._id}>
                        {product.productName}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    margin="normal"
                  />
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      color="secondary"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {isEditing ? "Update Order" : "Create Order"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderForm;
